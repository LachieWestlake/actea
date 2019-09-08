import * as React from "react";
import { Component } from "react";
export interface MessageProps {}

export interface MessageState {}

class Message extends React.Component<MessageProps, MessageState> {
  state = {};
  render() {
    return (
      <div className="flex flex-col items-start flex-grow flex flex-col flex-col-reverse">
        <div className="mb-3">
          <div className="text-grey-darker inline-block text-sm">
            5 months ago
          </div>
          <p className="rounded-sm py-3 px-2 bg-blue-200 mt-1">
            I want you to work on this project with me!
          </p>
        </div>
        <div className="mb-3">
          <div className="text-grey-darker inline-block text-sm">
            5 months ago
          </div>
          <p className="rounded-sm py-3 px-2 bg-blue-200 mt-1">Hey Deep!</p>
        </div>
      </div>
    );
  }
}

export default Message;
