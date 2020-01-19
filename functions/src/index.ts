import {Request, Response} from "express";
import {Change, EventContext} from "firebase-functions";
import * as admin from "firebase-admin";
import DocumentSnapshot = admin.firestore.DocumentSnapshot;

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database
// type DataSnapshot = admin.database.DataSnapshot;
const algoliasearch = require('algoliasearch');
const client = algoliasearch(functions.config().agolia.app_id, functions.config().agolia.api_key);

admin.initializeApp(functions.config().firebase);

type SearchQuery = {
    query: string
}
type SearchResult = {
    content: {},
    result: string,
    time: Date
}

const db = admin.firestore();

exports.storeUserData = functions.auth.user().onCreate((user: any) => {
  console.log("adding user...");
  console.log(user.toJSON());
  const name = user.displayName || user.user_name || null;
  db.collection("users")
    .doc(user.email)
    .set({
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      createdAt: new Date(user.metadata.creationTime)
    });
  return true;
});

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


const algoliaSkillsIndex = functions.config().agolia.index_skills;

exports.indexentry = functions.firestore.document('/skills/{id}').onWrite(
    async (data:Change<DocumentSnapshot>, context:EventContext) => {
        const index = client.initIndex(algoliaSkillsIndex);
        const firebaseObject = {
            text: data.after.data(),
            objectID: context.params.id
        };

        await index.saveObject(firebaseObject);
        return true
    });

exports.searchRequest = functions.https.onRequest(
    async (req: Request, response: Response) => {
        const searchQuery: SearchQuery = JSON.parse(req.query.searchQuery);
        const index = client.initIndex(algoliaSkillsIndex);

        const query = searchQuery.query;
        let content:SearchResult
        if(query){
            content = {
                content: await index.search(query),
                result: "SUCCESS",
                time: new Date()
            }
        } else {
            content = {
                content:{},
                result: "FAIL",
                time: new Date()
            }
        }

        response.set("Access-Control-Allow-Origin", "*");
        response.status(200).send(content);
    }
)

exports.sendCollectionToAlgolia = functions.https.onRequest(async (req: Request, res:Response) => {
    if(req.query.collection && req.query.algoliaIndex){
        const algoliaRecords : any[] = [];

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