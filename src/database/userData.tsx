import {data} from "./data";
import {Timestamp} from 'firebase/storage';

export type UserProperties = {
    displayName: string,
    photoURL: string,
    email: string,
    tagline: string,
    description: string,
    phoneNumber: string,
    createdAt?: Timestamp,
    university: string
}


class UserData {
    async getUserFromEmail(email: string) {
        const userData = await data
            .getDatabase()
            .collection("users")
            .doc(email)
            .get();
        return userData.data();
    }

    async getUserListFromPartialEmail(partialEmail: string) {
        const userData = await data
            .getDatabase()
            .collection("users")
            .orderBy("email")
            .startAt(partialEmail)
            .endAt(partialEmail + "\uf8ff")
            .get();
        return userData.docs.map(doc => doc.data());
    }

    setUserData(email: String, newData: Object) {
        data
            .getDatabase()
            .collection("users")
            .doc(email)
            .set(newData, {merge: true});
    }

    getUserName(userData) {
        return userData.displayName || userData.email;
    }
}

for (const key of Object.getOwnPropertyNames(UserData.prototype)) {
    const old = UserData.prototype[key];
    if (old.constructor.name === "AsyncFunction") {
        UserData.prototype[key] = async function (...args) {
            console.log('Fetching Data', key);
            return await old.call(this, ...args);
        };
    } else {
        UserData.prototype[key] = function (...args) {
            console.log('Fetching Data', key);
            return old.call(this, ...args);
        };
    }

}


export default UserData;
