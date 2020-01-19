import {data, skillsData} from "./data";
import authUser from "../auth/auth";
import {Observable} from 'rxjs'
import firebase from 'firebase'

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export type SearchQuery = {
    query: string
}
export type SearchResult = {
    matches: {
        skill: Skill,
        highlightedText?: string
        matchLevel: string
    }[]
}


type AgoliaSearchResult = {
    content: {
        hits: {
            text: {
                name: string,
                usersWithSkill: {
                    [user: string]: boolean
                }
            },
            objectID: string,
            _highlightResult: {
                text: {
                    name: {
                        value: string,
                        matchLevel: string,
                    }
                }
            }
        }[],
    }
}

export type Skill = {
    name: string,
    id: string,
    usersWithSkill: { [email: string]: boolean }
}

export type SkillPhoto = {
    url: string,
    user: string,
    id?: string
}
export type SkillDescription = {
    description: string,
    user: string
}

export default class SkillsData {
    getSkillsForUser = (email: string = authUser.getEmail() || "") =>
        new Observable<Array<Skill>>((observer) => {
            if (email) {
                data.getDatabase()
                    .collection("skills")
                    .where(
                        new firebase.firestore.FieldPath(`usersWithSkill`, email),
                        "==",
                        true
                    ).onSnapshot((skillsCollection) => {
                    observer.next(skillsCollection.docs.map(
                        (skill: firebase.firestore.DocumentSnapshot) =>
                            ({id: skill.id, ...skill.data()})
                    ))
                })
            }
        })

    getSkillImages = (skillId: string, email: string = authUser.getEmail() || "") =>
        new Observable<Array<SkillPhoto>>((observer) => {
            if (skillId && email) {
                data
                    .getDatabase()
                    .collection(`skills/${skillId}/skillPhotos`)
                    .where("user", "==", email)
                    .onSnapshot((skillPhotoList) => {
                        observer.next(skillPhotoList.docs.map((skillImgDocument: QueryDocumentSnapshot) =>
                            ({id: skillImgDocument.id, ...skillImgDocument.data()})))
                    });
            }
        })

    getSkillDescription = (skillId: string, email: string = authUser.getEmail() || "") =>
        new Observable<SkillDescription>((observer) => {
            if (skillId && email) {
                data
                    .getDatabase()
                    .collection(`skills/${skillId}/skillDescription`)
                    .where("user", "==", email)
                    .onSnapshot((skillDescList) => {
                        observer.next(skillDescList.docs[0]?.data())
                    });
            }
        })

    async getSkills(limit: number, query: SearchQuery): Promise<SearchResult> {
        if (query.query) {
            let queryResult: AgoliaSearchResult = await (await fetch(
                    `https://us-central1-socialmedia-9fc35.cloudfunctions.net/searchRequest?searchQuery=${
                        JSON.stringify(query)
                    }`)
            ).json()
            console.log(queryResult)
            return {
                matches: queryResult.content.hits.map(skill => ({
                    skill: {id: skill.objectID, ...skill.text},
                    highlightedText: skill._highlightResult.text.name.value,
                    matchLevel: skill._highlightResult.text.name.matchLevel
                }))
            }
        } else {
            let skills = await data
                .getDatabase()
                .collection(`skills`)
                .limit(limit)
                .get()
            return {
                matches: skills.docs.map(skill =>
                    ({skill: {id: skill.id, ...skill.data()}}))
            }
        }
    }

    filterUsersWithSkill(skill: Skill): string[] {
        return Object.keys(skill.usersWithSkill).filter(user => skill.usersWithSkill[user])
    }

    async setSkillDescription(skillId: string, description: string, user: string = authUser.getEmail() || "") {
        let skillDescCollection = data
            .getDatabase()
            .collection(`skills/${skillId}/skillDescription`)
        let id = (await skillDescCollection
            .where("user", "==", user).get()).docs[0]?.id
        if (id) {
            await skillDescCollection.doc(id).set({description, user})
        } else {
            await skillDescCollection.add({description, user})
        }

    }

    async createNewSkill(skillName: string, email: string | undefined = authUser.getEmail()): Promise<boolean> {
        if (email) {
            skillName = skillName.toLowerCase()
            let skill = {
                name: skillName,
                usersWithSkill: {
                    [email]: true
                }
            }
            let skillDoc = data.getDatabase()
                .collection("skills")
                .where(
                    new firebase.firestore.FieldPath(`name`),
                    "==",
                    skillName
                )
            let skillExists = (await skillDoc.get()).docs.length > 0
            let userExistsInSkill = (await skillDoc.where(
                new firebase.firestore.FieldPath(`usersWithSkill`, email),
                "==",
                true
            ).get()).docs.length > 0
            if (!skillExists) {
                await data.getDatabase()
                    .collection("skills").add(skill)
                await data.getDatabase().doc("meta/skills")
                    .set({count: firebase.firestore.FieldValue.increment(1)})
                return true
            } else if (skillExists && !userExistsInSkill) {
                let docId = (await skillDoc.get()).docs[0].id
                await data.getDatabase()
                    .collection("skills").doc(docId).set(skill, {merge: true})
                return true
            }
            return false
        }
        return false
    }

    async deleteAssociation(skillId: string, email: string | undefined = authUser.getEmail()) {
        if (email) {
            await data.getDatabase()
                .collection("skills").doc(skillId).set({usersWithSkill: {[email]: false}}, {merge: true})
        }
    }

    async getSkillDetails(skillId: string): Promise<Skill> {
        let skillImg = await data
            .getDatabase()
            .collection(`skills`)
            .doc(skillId)
            .get();
        return {id: skillImg.id, ...skillImg.data()}
    }

    async addImage(skillId: string, url: string, user: string | undefined = authUser.getEmail()) {
        if (user) {
            let photo: SkillPhoto = {url, user}
            await data
                .getDatabase()
                .collection("skills")
                .doc(skillId).collection("skillPhotos").add(photo)
        }
    }

    async deleteImage(skillId: string, imageId: string, user: string | undefined = authUser.getEmail()) {
        if (user) {
            await data
                .getDatabase()
                .collection("skills")
                .doc(skillId).collection("skillPhotos").doc(imageId).delete()
        }
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
