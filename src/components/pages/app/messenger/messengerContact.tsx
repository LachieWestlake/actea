import * as React from "react";
import { Component } from "react";
import data from "../../../../database/data";
import authUser from "../../../../auth/auth";
import ProfileImg from "../components/profileImg";
import { Link } from "react-router-dom";
export interface MessengerContactProps {
  channelId;
}

export interface MessengerContactState {}

class MessengerContact extends React.Component<
  MessengerContactProps,
  MessengerContactState
> {
  state = { image: "load", name: "", lastMessage: "" };
  componentDidMount() {
    data.getChannelInfoFromFirebase(
      this.props.channelId,
      this.renderChannelInfo
    );
  }

  renderChannelInfo = channelInfo => {
    console.log(channelInfo);
    let peopleArray: Array<string> = Object.entries(channelInfo.people)
      .filter(([_, v]) => v)
      .map(x => x[0]);
    this.setState({ lastMessage: channelInfo.lastMessage });
    peopleArray = peopleArray.filter(item => item !== authUser.getEmail());
    let name = peopleArray.join(", ");
    this.setState({ name });
    data.getUserFromEmail(peopleArray[0]).then(this.renderUserData);
  };

  renderUserData = userData => {
    this.setState({
      image: userData.photoURL
    });
  };
  render() {
    return (
      <Link to={`/app/messenger/channel/${this.props.channelId}`}>
        <div className="flex">
          <ProfileImg
            picClasses="h-16 w-16 rounded-full mx-auto flex-no-shrink"
            img={this.state.image}
          />
          <div className="p-4 overflow-hidden">
            <div className="font-bold text-xl mb-2">{this.state.name}</div>
            <p className="text-gray-700 text-base">{this.state.lastMessage}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default MessengerContact;
