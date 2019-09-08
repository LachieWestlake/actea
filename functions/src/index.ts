// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.storeUserData = functions.auth.user().onCreate((user:any) => {
    console.log('adding user...');
    console.log(user.toJSON());
    const name = (user.displayName || user.user_name) || null
    db.collection("users").doc(user.email).set({
        uid: user.uid,
        email: user.email,
        displayName: name,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        createdAt: new Date(user.metadata.creationTime)
    });
    return true;
});