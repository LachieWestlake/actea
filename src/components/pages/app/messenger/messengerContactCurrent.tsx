import * as React from "react";
import { Component } from "react";
import { messageData, userData } from "../../../../database/data";
import authUser from "../../../../auth/auth";
import { withRouter } from "react-router-dom";
import ProfileImg from "../components/profileImg";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";

type MessengerContactCurrentProps = RouteComponentProps & {
  channelId;
  backButton: boolean;
  history: any;
};

export interface MessengerContactCurrentState {}

class MessengerContactCurrent extends React.Component<
  MessengerContactCurrentProps,
  MessengerContactCurrentState
> {
  state = { image: "load", name: "", lastMessage: "" };
  componentDidMount() {
    messageData.getChannelInfoFromFirebase(
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
    userData.getUserFromEmail(peopleArray[0]).then(this.renderUserData);
  };

  renderUserData = userData => {
    this.setState({
      image: userData.photoURL
    });
  };
  render() {
    return (
      <div className="flex border-b pb-2">
        {this.props.backButton ? (
          <div className="flex items-center"
            onClick={() => {
              this.props.history.goBack();
            }}>
            <i className="fas fa-chevron-left mr-5 ml-2" />
          </div>
        ) : (
          false
        )}
        <ProfileImg
          picClasses={`h-8 w-8 rounded-full mx-auto flex-no-shrink`}
          img={this.state.image}
        />
        <div className="pl-4 py-2 overflow-hidden">
          <div className="font-bold text-xl">{this.state.name}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(MessengerContactCurrent);
