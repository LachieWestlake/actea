import {Request, Response} from "express";
import {Change, EventContext} from "firebase-functions";
import * as admin from "firebase-admin";
import DocumentSnapshot = admin.firestore.DocumentSnapshot;

const fetch = require('node-fetch');
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database
// type DataSnapshot = admin.database.DataSnapshot;
const algoliasearch = require('algoliasearch');
const client = algoliasearch(functions.config().agolia.app_id, functions.config().agolia.api_key);
admin.initializeApp({
    credential: admin.credential.cert(require('./key.json')),
    storageBucket: "socialmedia-9fc35.appspot.com"
});

type SearchResult = {
    content: {},
    result: string,
    time: Date
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

exports.storeUserData = functions.auth.user().onCreate(async (user: any) => {
    console.log("adding user...");
    console.log(user.toJSON());
    const name = user.displayName || user.user_name || null;
    await db.collection("users")
        .doc(user.email)
        .set({
            uid: user.uid,
            email: user.email,
            displayName: name,
            phoneNumber: user.phoneNumber,
            createdAt: new Date(user.metadata.creationTime)
        });
    if (user.photoURL) {
        const url = await uploadPhoto(user.photoURL, user.uid)
        await savePhotoToProfile(url, user.email)
    }
    return true;
});

async function savePhotoToProfile(url: string, email: string) {
    console.log(email)
    db.collection("users")
        .doc(email)
        .set({
            photoURL: url
        }, {merge: true})
}

async function uploadPhoto(url: string, uid: string) {
    const oldPhoto =  await fetch(url);
    const newPhoto = bucket.file("profileImgs/" + uid + ".jpeg" )

    const contentType = oldPhoto.headers.get('content-type');
    const writeStream = newPhoto.createWriteStream({
        metadata: {
            contentType
        }
    });
    await oldPhoto.body.pipe(writeStream);

    return (await newPhoto.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }))[0]
}

exports.convertAllToJpg = functions.https.onRequest(
    async (req: Request, response: Response) => {
        const getAllUsers = await db
            .collection("users").get()
        const photos = await Promise.all(getAllUsers.docs.filter(doc => doc.data().photoURL)
            .map(async (doc) => {
                const url = await uploadPhoto(doc.data().photoURL, doc.data().uid)
                await savePhotoToProfile(url, doc.data().email)
                return url
            }))
        response.set("Access-Control-Allow-Origin", "*");
        response.status(200).send(photos);
    }
);

exports.landingPageForm = functions.https.onRequest(
    async (req: Request, response: Response) => {
        const formData: string = req.query.formData;
        await db
            .collection("landingPageForm")
            .add(JSON.parse(formData));
        response.set("Access-Control-Allow-Origin", "*");
        response.status(200).send("Data Added!");
    }
);

exports.indexentry = functions.firestore.document('/skills/{id}').onWrite(
    async (data: Change<DocumentSnapshot>, context: EventContext) => {
        const index = client.initIndex("skills");
        const firebaseObject = {
            text: data.after.data(),
            objectID: context.params.id
        };

        await index.saveObject(firebaseObject);
        return true
    });

exports.indexentryProject = functions.firestore.document('/projects/{id}').onWrite(
    async (data: Change<DocumentSnapshot>, context: EventContext) => {
        const index = client.initIndex("projects");
        const firebaseObject = {
            text: data.after.data(),
            objectID: context.params.id
        };

        await index.saveObject(firebaseObject);
        return true
    });

exports.searchRequest = functions.https.onRequest(
    async (req: Request, response: Response) => {
        if (req.query.searchQuery && req.query.indexName) {
            const searchQuery = req.query.searchQuery;
            const index = client.initIndex(req.query.indexName);
            let content: SearchResult

            if (searchQuery) {
                content = {
                    content: await index.search(searchQuery),
                    result: "SUCCESS",
                    time: new Date()
                }
            } else {
                content = {
                    content: {},
                    result: "FAIL",
                    time: new Date()
                }
            }

            response.set("Access-Control-Allow-Origin", "*");
            response.status(200).send(content);
        } else {
            response.status(500).send("Please specify query and index using ?searchQuery=...&indexName=...");
        }

    }
)

exports.sendCollectionToAlgolia = functions.https.onRequest(async (req: Request, res: Response) => {
    if (req.query.collection && req.query.algoliaIndex) {
        const algoliaRecords: any[] = [];

        // Retrieve all documents from the COLLECTION collection.
        const querySnapshot = await db.collection(req.query.collection).get();

        querySnapshot.docs.forEach(doc => {
            const document = doc.data();
            // Essentially, you want your records to contain any information that facilitates search,
            // display, filtering, or relevance. Otherwise, you can leave it out.
            const record = {
                text: document,
                objectID: doc.id
            };
            algoliaRecords.push(record);
        });

        // After all records are created, we save them to
        const index = client.initIndex(req.query.algoliaIndex);
        index.saveObjects(algoliaRecords, (_error: any, content: any) => {
            res.status(200).send(`${req.query.collection} was indexed to Algolia index ${
                req.query.algoliaIndex} successfully.`);
        });
    } else {
        res.status(500).send("Please specify collection and index using ?collection=...&algoliaIndex=");
    }
})