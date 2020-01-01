import * as React from "react";
import { Component } from "react";
import Moment from "react-moment";
export interface MessagesProps {
  messages;
}

export interface MessagesState {}

class Messages extends React.Component<MessagesProps, MessagesState> {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <div className="flex  flex-col items-start flex-grow flex flex-col flex-col-reverse overflow-auto">
        {this.props.messages.map((message,i) => {
          let date:string = message.date.toDate()
          return <div className="mb-3" key={date}>
            <div className="text-grey-darker inline-block text-sm">
              <Moment fromNow>{date}</Moment>
            </div>
            <p className="rounded-sm py-3 px-2 bg-blue-200 mt-1 break-all">
              {message.text}
            </p>
          </div>
        })}
      </div>
    );
  }
}

export default Messages;
