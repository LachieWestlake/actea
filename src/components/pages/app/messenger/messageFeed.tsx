import * as React from "react";
import { Component } from "react";
import Messages from "./messages";
import WriteMessage from "./writeMessage";
import { messageData } from "../../../../database/data";
export interface MessageFeedProps {
  channelId;
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
        <div className="flex-grow rounded-lg mx-6 mb-4 overflow-hidden shadow-lg flex bg-white p-4 flex flex-col">
          <Messages messages={this.state.messages} />
          <WriteMessage channelId = {this.props.channelId} />
        </div>
      );
    }
    return false;
  }
}

export default MessageFeed;
