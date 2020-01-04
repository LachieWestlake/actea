import {data} from "./data";
import authUser from "../auth/auth";
import {QueryDocumentSnapshot} from 'firebase/storage'
import firebase from 'firebase'

export default class SkillsData {
    async getSkillsForUser(email: string = authUser.getEmail() || "") {
        if (email) {
            let skills = await data
                .getDatabase()
                .collection("skills")
                .where(
                    new firebase.firestore.FieldPath(`usersWithSkill`, email),
                    "==",
                    true
                )
                .get();
            let skillsList: Array<any> = [];
            skills.forEach((skill: firebase.firestore.DocumentSnapshot) => {
                skillsList.push({name: skill.get("name"), id: skill.id});
            });
            return skillsList;
        }
        return [];
    }

    async getSkillImages(skillId: string, email: string = authUser.getEmail() || "") {
        if (skillId && email) {
            let skillImg = await data
                .getDatabase()
                .collection(`skills/${skillId}/skillPhotos`)
                .where("user", "==", email)
                .get();
            return skillImg.docs.map((skillImgDocument: QueryDocumentSnapshot) => (skillImgDocument.data()))
        }
        return []
    }

    async getSkillDetails(skillId: string) {
        let skillImg = await data
            .getDatabase()
            .collection(`skills`)
            .doc(skillId)
            .get();
        return skillImg.data()
    }
}

for (const key of Object.getOwnPropertyNames(SkillsData.prototype)) {
    const old = SkillsData.prototype[key];
    if (old.constructor.name === "AsyncFunction") {
        SkillsData.prototype[key] = async function (...args) {
            console.log('Fetching Data', key);
            return await old.call(this, ...args);
        };
    } else {
        SkillsData.prototype[key] = function (...args) {
            console.log('Fetching Data', key);
            return old.call(this, ...args);
        };
    }

}
