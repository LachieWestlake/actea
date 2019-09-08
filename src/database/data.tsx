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
  setUserData(email: String, newData: Object){
    this.database
    .collection("users")
    .doc(email)
    .set(newData, { merge: true });
  }
}
let data: Data = new Data();
export default data;
