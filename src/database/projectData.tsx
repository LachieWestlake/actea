class ProjectData {
    getLatestPosts(loadDone: Function, number: Number, email: String) {
        let query = this.database
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
        let query = this.database
          .collection("projects")
          .orderBy("title")
                     .startAt(search)
                     .endAt(search+"\uf8ff")
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
        this.database.collection("projects").add({
          title: title,
          content: content,
          image: imgLink,
          time: new Date(),
          user_email: authUser.getEmail(),
          user_name: authUser.getName()
        });
      }
}