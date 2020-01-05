import {data} from "./data";
import authUser from "../auth/auth";
import * as firebase from "firebase/app";

class MessageData {
    getUserChannelsFromFirebase(callback) {
        let email = authUser.getEmail();
        if (email) {
            data.getDatabase()
                .collection("channels")
                .where(new firebase.firestore.FieldPath(`people`, email), "==", true)
                .onSnapshot(channelsRef => {
                    let channels: Array<any> = [];
                    channelsRef.forEach(channel => {
                        channels.push(channel.id);
                    });
                    callback(channels);
                });
        }
        callback([]);
    }

    getChannelInfoFromFirebase(channelId, callback) {
        console.log(channelId);
        data.getDatabase()
            .collection("channels")
            .doc(channelId)
            .onSnapshot(querySnapshot => {
                callback(querySnapshot.data());
            });
    }

    getChannelMessagesFromFirebase(channelId, callback) {
        data.getDatabase()
            .collection("channels")
            .doc(channelId)
            .collection("messages")
            .orderBy("date", "desc")
            .onSnapshot(querySnapshot => {
                let messages: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    messages.push(doc.data());
                    callback(messages);
                });
            });
    }

    sendNewMessageToChannel(channelId: string, message: string) {
        data.getDatabase()
            .collection("channels")
            .doc(channelId)
            .collection("messages")
            .add({
                date: new Date(),
                text: message
            });
        data.getDatabase()
            .collection("channels")
            .doc(channelId)
            .set(
                {
                    lastMessage: message
                },
                {merge: true}
            );
    }

    async createNewChannel(users: Array<string>) {
        let channelsCollection = data.getDatabase().collection("channels");
        users.forEach(userEmail => {
            channelsCollection = channelsCollection.where(
                new firebase.firestore.FieldPath(`people`, userEmail),
                "==",
                true
            );
        });
        let matchingChannelsFound = await channelsCollection.get();

        if (!matchingChannelsFound.empty) {
            let matchingChannelsProcessed = matchingChannelsFound.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log(matchingChannelsProcessed);
            if (matchingChannelsProcessed[0]) {
                console.log(matchingChannelsProcessed);
                return matchingChannelsProcessed[0].id;
            }
        }

        let usersHashMap = {};
        users.forEach(value => {
            usersHashMap[value] = true;
        });
        let addCollection = await data.getDatabase().collection("channels").add({
            lastMessage: "Create A New Message...",
            people: usersHashMap
        });
        return addCollection.id;
    }
}

for (const key of Object.getOwnPropertyNames(MessageData.prototype)) {
    const old = MessageData.prototype[key];
    if (old.constructor.name === "AsyncFunction") {
        MessageData.prototype[key] = async function (...args) {
            console.log('Fetching Data', key);
            return await old.call(this, ...args);
        };
    } else {
        MessageData.prototype[key] = function (...args) {
            console.log('Fetching Data', key);
            return old.call(this, ...args);
        };
    }

}


export default MessageData
