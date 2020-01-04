import {data} from "./data";
import authUser from "../auth/auth";

class ProjectData {

    getProject(id: string, done: Function) {
        data.getDatabase()
            .collection("projects")
            .doc(id)
            .get()
            .then(doc => {
                done(doc.data());
            });
    }

    getLatestPosts(loadDone: Function, number: Number, email: String) {
        let query = data.getDatabase()
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
        let query = data.getDatabase()
            .collection("projects")
            .orderBy("title")
            .startAt(search)
            .endAt(search + "\uf8ff")
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

    addNewProject(title: string, content: string, imgLink: string) {
        data.getDatabase().collection("projects").add({
            title: title,
            content: content,
            image: imgLink,
            time: new Date(),
            user_email: authUser.getEmail(),
            user_name: authUser.getName()
        });
    }
}

for (const key of Object.getOwnPropertyNames(ProjectData.prototype)) {
    const old = ProjectData.prototype[key];
    if (old.constructor.name === "AsyncFunction") {
        ProjectData.prototype[key] = async function (...args) {
            console.log('Fetching Data', key);
            return await old.call(this, ...args);
        };
    } else {
        ProjectData.prototype[key] = function (...args) {
            console.log('Fetching Data', key);
            return old.call(this, ...args);
        };
    }

}


export default ProjectData