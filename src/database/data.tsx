import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import './messageData'
import './projectData'
import './userData'
import "firebase/firestore";
import authUser from "../auth/auth";
import MessageData from "./messageData";
import ProjectData from "./projectData";
import UserData from "./userData";
import SkillsData from './skillsData'
import CommentData from "./commentData";


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
}
let data: Data = new Data();
let messageData: MessageData = new MessageData();
let skillsData: SkillsData = new SkillsData();
let projectData: ProjectData = new ProjectData();
let commentData: CommentData = new CommentData();
let userData: UserData = new UserData();

export {data, messageData, projectData, userData, skillsData, commentData};
