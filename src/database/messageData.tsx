class MessageData {
  getUserChannelsFromFirebase(callback) {
    let email = authUser.getEmail();
    if (email) {
      this.database
        .collection("channels")
        .where(new firebase.firestore.FieldPath(`people`, email), "==", true)
        .onSnapshot(channelsRef => {
          let channels: Array<any> = [];
          channelsRef.forEach(channel => {
            channels.push(channel.id);
          });
          callback(channels);
        });
    }
    callback([]);
  }
  getChannelInfoFromFirebase(channelId, callback) {
    console.log(channelId);
    this.database
      .collection("channels")
      .doc(channelId)
      .onSnapshot(querySnapshot => {
        callback(querySnapshot.data());
      });
  }
  getChannelMessagesFromFirebase(channelId, callback) {
    this.database
      .collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("date", "desc")
      .onSnapshot(querySnapshot => {
        let messages: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          messages.push(doc.data());
          callback(messages);
        });
      });
  }
  sendNewMessageToChannel(channelId: string, message: string) {
    this.database
      .collection("channels")
      .doc(channelId)
      .collection("messages")
      .add({
        date: new Date(),
        text: message
      });
    this.database
      .collection("channels")
      .doc(channelId)
      .set(
        {
          lastMessage: message
        },
        { merge: true }
      );
  }

  async createNewChannel(users: Array<string>) {
    let channelsCollection = this.database.collection("channels");
    users.forEach(userEmail => {
      channelsCollection = channelsCollection.where(
        new firebase.firestore.FieldPath(`people`, userEmail),
        "==",
        true
      );
    });
    let matchingChannelsFound = await channelsCollection.get();

    if (!matchingChannelsFound.empty) {
      let matchingChannelsProcessed = matchingChannelsFound.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(matchingChannelsProcessed);
      if (matchingChannelsProcessed[0]) {
        console.log(matchingChannelsProcessed);
        return matchingChannelsProcessed[0].id;
      }
    }

    let usersHashMap = {};
    users.forEach(value => {
      usersHashMap[value] = true;
    });
    let addCollection = await this.database.collection("channels").add({
      lastMessage: "Create A New Message...",
      people: usersHashMap
    });
    return addCollection.id;
  }
}
