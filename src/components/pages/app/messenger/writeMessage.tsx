import * as React from "react";
import { Component } from "react";
export interface WriteMessageProps {}

export interface WriteMessageState {}

class WriteMessage extends React.Component<
  WriteMessageProps,
  WriteMessageState
> {
  state = {};
  render() {
    return (
      <div className="border-t border-t -2 border-gray-300 pt-2 flex">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="New Message"
          aria-label="Full name"
        />
        <div>
          <i className="fas fa-paper-plane font-2xl mr-2" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default WriteMessage;
