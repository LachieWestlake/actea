import * as firebase from "firebase/app";
import "firebase/auth";
import {userData} from "../database/data";

class Auth {
  getAuth() {
    return firebase.auth();
  }
  signOut() {
    return firebase.auth().signOut();
  }
  onAuthStateChanged(callback: any) {
    firebase.auth().onAuthStateChanged(callback);
  }
  getName() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      return userData.getUserName(currentUser);
    } else {
        return false;
    }
  }
  getEmail() {
    let currentUser = firebase.auth().currentUser;
    return currentUser?.email||undefined;
  }
}

const authUser = new Auth();
export default authUser;
