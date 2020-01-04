import { data } from "./data";
import authUser from "../auth/auth";
import { async } from "q";

class UserData {
  async getUserFromEmail(email: string) {
    const userData = await data.getDatabase()
      .collection("users")
      .doc(email)
      .get();
    return userData.data();
  }
  async getUserListFromPartialEmail(partialEmail: string) {
    const userData = await data.getDatabase()
      .collection("users")
      .orderBy("email")
      .startAt(partialEmail)
      .endAt(partialEmail + "\uf8ff")
      .get();
    return userData.docs.map(doc => doc.data());
  }
  setUserData(email: String, newData: Object) {
    data.getDatabase()
      .collection("users")
      .doc(email)
      .set(newData, { merge: true });
  }
  getUserName(userData) {
    return userData.displayName || userData.email;
  }
  async getUserTheme() {
    const email = await authUser.getEmail();
    let theme :string = 'theme-light';

    if(email){ 
      let userData = await this.getUserFromEmail(email);
      theme = userData.theme
    }
    return theme
  }
}

export default UserData;