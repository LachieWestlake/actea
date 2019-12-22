class UserData{
    async getUserFromEmail(email: string) {
        const userData = await this.database
          .collection("users")
          .doc(email)
          .get();
        return userData.data();
      }
      async getUserListFromPartialEmail(partialEmail: string) {
        const userData = await this.database
          .collection("users")
          .orderBy("email")
          .startAt(partialEmail)
          .endAt(partialEmail + "\uf8ff")
          .get();
        return userData.docs.map(doc => doc.data());
      }
      setUserData(email: String, newData: Object) {
        this.database
          .collection("users")
          .doc(email)
          .set(newData, { merge: true });
      }
      getUserName(userData) {
        return userData.displayName || userData.email;
      }
}