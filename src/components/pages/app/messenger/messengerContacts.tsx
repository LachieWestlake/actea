import * as React from "react";
import { Component } from "react";
import MessengerContact from "./messengerContact";
export interface MessengerContactsProps {}

export interface MessengerContactsState {}

class MessengerContacts extends React.Component<
  MessengerContactsProps,
  MessengerContactsState
> {
  state = {};
  render() {
    return (
      <div className="w-1/4 ">
        <MessengerContact />
        <MessengerContact />
        <MessengerContact />
        <MessengerContact />
      </div>
    );
  }
}

export default MessengerContacts;
