import * as React from "react";
import { Component } from "react";
import MessengerContacts from "./messengerContacts";
import MessageFeed from "./messageFeed";
export interface MessengerProps {
  match;
}

export interface MessengerState {}

class Messenger extends React.Component<MessengerProps, MessengerState> {
  state = {};
  
  render() {
    return (
      <div className="flex flex-col flex-grow bg-gray-800 overflow-hidden" >
        <div className="w-full text-center my-5 font-bold text-white">
          <i className="fas fa-comment mr-5"></i>Messenger
        </div>
        <div className="flex-grow flex overflow-hidden">
          <MessengerContacts />
          <MessageFeed channelId={this.props.match.params.channelId} key = {this.props.match.params.channelId}/>
        </div>
      </div>
    );
  }
}

export default Messenger;
