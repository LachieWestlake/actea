import * as React from "react";
import { Component } from "react";
import MessengerContact from "./messengerContact";
import MessageContactSelect from "./selectContacts/messageContactSelect";
import data from "../../../../database/data";
import Loader from "../components/loader";
import LoadIcon from "../components/loadIcon";
export interface MessengerContactsProps {}

export interface MessengerContactsState {}

class MessengerContacts extends React.Component<
  MessengerContactsProps,
  MessengerContactsState
> {
  state = { channels: [] };
  componentDidMount() {
    data.getUserChannelsFromFirebase().then(channels => {
      this.setState({ channels });
    });
  }
  render() {
    return (
      <div className="w-1/4 flex">
        <div className="max-w-sm rounded-lg ml-6 mr-2 mb-4 overflow-hidden shadow-lg bg-white p-3">
          {!this.state.channels.length ? (
            <LoadIcon className="ml-3" />
          ) : (
            <>
              {this.state.channels.map(channel => {
                return <MessengerContact channelId={channel} key={channel} />;
              })}
              <div className="m-auto text-center">
                <i className="fas fa-plus rounded-full border p-4 "></i>
                <MessageContactSelect />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default MessengerContacts;
