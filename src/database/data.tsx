import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import authUser from "../auth/auth";

class Data {
  config: Object = {
    apiKey: "AIzaSyAb_kMMrv4WyMq3RblpNnHDSC4VU62OQvU",
    authDomain: "socialmedia-9fc35.firebaseapp.com",
    databaseURL: "https://socialmedia-9fc35.firebaseio.com",
    projectId: "socialmedia-9fc35",
    storageBucket: "socialmedia-9fc35.appspot.com",
    messagingSenderId: "301970558686"
  };
  private database: any;
  initApp() {
    console.log(this.config);
    firebase.initializeApp(this.config);
    this.database = firebase.firestore();
  }
  getDatabase() {
    return this.database;
  }
  getLatestPosts(loadDone: Function, number: Number, email: String) {
    let query = this.database
      .collection("projects")
      .orderBy("time", "desc")
      .limit(number);
    if (email) {
      query = query.where("user_email", "==", email);
    }
    return query.onSnapshot(data => {
      loadDone(this.processFirebaseList(data));
    });
  }

  getPostSearchResults(loadDone: Function, search: String, email: String) {
    let query = this.database
      .collection("projects")
      .orderBy("title")
                 .startAt(search)
                 .endAt(search+"\uf8ff")
    if (email) {
      query = query.where("user_email", "==", email);
    }
    return query.onSnapshot(data => {
      loadDone(this.processFirebaseList(data));
    });
  }

  processFirebaseList(data: any) {
    let projects: Array<Object> = [];
    data.forEach((i: any) => {
      data = i.data();
      data["id"] = i.id;
      projects.push(data);
    });
    return projects;
  }
  getProject(id: string, done: Function) {
    this.database
      .collection("projects")
      .doc(id)
      .get()
      .then(doc => {
        done(doc.data());
      });
  }
  addNewProject(title: string, content: string, imgLink: string) {
    this.database.collection("projects").add({
      title: title,
      content: content,
      image: imgLink,
      time: new Date(),
      user_email: authUser.getEmail(),
      user_name: authUser.getName()
    });
  }
  async getUserFromEmail(email: string) {
    const userData = await this.database
      .collection("users")
      .doc(email)
      .get();
    return userData.data();
  }
  async getUserListFromPartialEmail(partialEmail: string) {
    const userData = await this.database
      .collection("users")
      .orderBy("email")
      .startAt(partialEmail)
      .endAt(partialEmail + "\uf8ff")
      .get();
    return userData.docs.map(doc => doc.data());
  }
  setUserData(email: String, newData: Object) {
    this.database
      .collection("users")
      .doc(email)
      .set(newData, { merge: true });
  }
  getUserChannelsFromFirebase(callback) {
    let email = authUser.getEmail();
    if (email) {
      this.database
        .collection("channels")
        .where(new firebase.firestore.FieldPath(`people`, email), "==", true)
        .onSnapshot(channelsRef => {
          let channels: Array<any> = [];
          channelsRef.forEach(channel => {
            channels.push(channel.id);
          });
          callback(channels)
        });
    }
    callback([])
  }
  getChannelInfoFromFirebase(channelId, callback) {
    console.log(channelId);
    this.database
      .collection("channels")
      .doc(channelId)
      .onSnapshot(querySnapshot => {
        callback(querySnapshot.data());
      });
  }

  getUserName(userData) {
    return userData.displayName || userData.email;
  }

  getChannelMessagesFromFirebase(channelId, callback) {
    this.database
      .collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("date", "desc")
      .onSnapshot(querySnapshot => {
        let messages: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          messages.push(doc.data());
          callback(messages);
        });
      });
  }
  sendNewMessageToChannel(channelId: string, message: string) {
    this.database
      .collection("channels")
      .doc(channelId)
      .collection("messages")
      .add({
        date: new Date(),
        text: message
      });
    this.database
      .collection("channels")
      .doc(channelId)
      .set(
        {
          lastMessage: message
        },
        { merge: true }
      );
  }

  async createNewChannel(users: Array<string>) {
    let matchingChannelsFound = await this.database
      .collection("channels")
      .where(new firebase.firestore.FieldPath(`people`, users[0]), "==", true)
      .where(new firebase.firestore.FieldPath(`people`, users[1]), "==", true)
      .get();

    if (!matchingChannelsFound.empty) {
      let matchingChannelsProcessed = matchingChannelsFound.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      matchingChannelsProcessed = matchingChannelsProcessed.filter(
        channel => Object.keys(channel.people).length == 2
      );
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
    let addCollection = await this.database.collection("channels").add({
      lastMessage: "Create A New Message...",
      people: usersHashMap
    });
    return addCollection.id;
  }
}
let data: Data = new Data();
export default data;
