import * as React from "react";
import { Component } from "react";
import Messages from "./messages";
import WriteMessage from "./writeMessage";
import { messageData } from "../../../../database/data";
import MessengerContact from '../messenger/messengerContact'
import MessengerContactCurrent from "./messengerContactCurrent";
export interface MessageFeedProps {
  channelId;
  isMobile:boolean;
}

export interface MessageFeedState {}

class MessageFeed extends React.Component<MessageFeedProps, MessageFeedState> {
  state = {messages: []};
  componentDidMount(){
      if(this.props.channelId){
          messageData.getChannelMessagesFromFirebase(this.props.channelId,(messages)=>{
              this.setState({messages})
          })
      }
  }
  render() {
    if (this.props.channelId) {
      return (
        <div className="flex-grow overflow-hidden flex bg-white p-4 flex flex-col">
          <MessengerContactCurrent backButton={this.props.isMobile} channelId={this.props.channelId} />
          <Messages messages={this.state.messages} />
          <WriteMessage channelId = {this.props.channelId} />
        </div>
      );
    }
    return false;
  }
}

export default MessageFeed;
