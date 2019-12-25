import * as React from "react";
import { Component } from "react";
import {messageData} from "../../../../database/data";
export interface WriteMessageProps {
  channelId;
}

export interface WriteMessageState {}

class WriteMessage extends React.Component<
  WriteMessageProps,
  WriteMessageState
> {
  state = { message: "" };
  handleMessageTextChange = event => {
    this.setState({ message: event.target.value });
  };
  sendButton = () => {
    this.sendMessage(this.state.message);
  };
  sendMessage = (message: string) => {
    messageData.sendNewMessageToChannel(this.props.channelId, message);
    this.setState({ message: "" });
  };
  render() {
    return (
      <div className="border-t border-t -2 border-gray-300 pt-2 flex">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="New Message"
          value={this.state.message}
          onChange={this.handleMessageTextChange}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.sendButton();
            }
          }}
        />
        <div className="cursor-pointer" onClick={this.sendButton}>
          <i
            className="fas fa-paper-plane font-2xl mr-2"
            aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default WriteMessage;
