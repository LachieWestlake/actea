import firebaseui from "firebaseui";
import * as firebase from "firebase/app";
import {data} from "../../../database/data";
import "firebaseui/dist/firebaseui.css";
import authUser from "../../../auth/auth";
data.initApp();
// This is our firebaseui configuration object
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: "/terms-of-service" // This doesn't exist yet
};

// This sets up firebaseui
const ui = new firebaseui.auth.AuthUI(authUser.getAuth());

// This adds firebaseui to the page
// It does everything else on its own
const startFirebaseUI = function(elementId: string) {
  ui.start(elementId, uiConfig);
};

export { startFirebaseUI };
