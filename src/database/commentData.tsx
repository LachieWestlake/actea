import {data, userData} from "./data";
import authUser from "../auth/auth";
import {Observable} from 'rxjs'
import firebase from 'firebase'
import {AgoliaSearchResult} from "./searchTypes";

type Timestamp = firebase.firestore.Timestamp;

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export type FirebaseComment = {
    id: string,
    date: Timestamp,
    likes: Likes,
    text: string,
    parentPostId: string,
    type: string,
    user_email: string
}

export type Likes = {
    [email: string]: boolean
}

export enum CommentType {
    PROJECT = "project",
    USER = "user"
}

export default class CommentData {
    async getComments(projectId: string, commentType: CommentType): Promise<FirebaseComment[]> {
        let commentsForPost = await data
            .getDatabase()
            .collection(`comments`)
            .where("parentPostId", "==", projectId)
            .where("type", "==", commentType.toString())
            .orderBy("date", "desc")
            .get()
        return commentsForPost.docs.map((comment) => ({
            id: comment.id, ...comment.data()
        }))
    }

    async newComment(message: string, parentPostId: string, type: CommentType, email: string | undefined = authUser.getEmail()) {
        if (email) {
            return await data
                .getDatabase()
                .collection(`comments`)
                .add({
                    date: new Date(),
                    likes: {},
                    text: message,
                    parentPostId,
                    type: type.toString(),
                    user_email: email
                })
        }
        return false
    }

    async deleteComment(id: string){
        return await data
            .getDatabase()
            .collection(`comments`)
            .doc(id)
            .delete()
    }

    async likeChangeInComment(id: string, newLikedState: boolean, email: string | undefined = authUser.getEmail()) {
        if (email) {
            return await data
                .getDatabase()
                .collection(`comments`).doc(id)
                .set({likes: {[email]: newLikedState}}, {merge: true})
        }
        return
    }

    getLikesFromComment(comment: FirebaseComment) {
        return Object.keys(comment.likes).filter(key => comment.likes[key])
    }

    getNumberOfLikes(likes: Likes) {
        return Object.keys(likes).filter(key => likes[key]).length
    }

    isLikedBy(comment: FirebaseComment, email: string | undefined = authUser.getEmail()) {
        if (email) {
            return this.getLikesFromComment(comment).includes(email)
        }
        return false
    }
}

for (const key of Object.getOwnPropertyNames(CommentData.prototype)) {
    const old = CommentData.prototype[key];
    if (old.constructor.name === "AsyncFunction") {
        CommentData.prototype[key] = async function (...args) {
            console.log('Fetching Data', key);
            return await old.call(this, ...args);
        };
    } else {
        CommentData.prototype[key] = function (...args) {
            console.log('Fetching Data', key);
            return old.call(this, ...args);
        };
    }

}
