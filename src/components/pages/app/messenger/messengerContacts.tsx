import * as React from "react";
import { Component } from "react";
import MessengerContact from "./messengerContact";
import MessageContactSelect from "./selectContacts/messageContactSelect";
import { messageData } from "../../../../database/data";
import Loader from "../components/loader";
import LoadIcon from "../components/loadIcon";
export interface MessengerContactsProps {
  isMobile?:boolean
}

export interface MessengerContactsState {}

class MessengerContacts extends React.Component<
  MessengerContactsProps,
  MessengerContactsState
> {
  state = { channels: [], showContactSelect: false };
  componentDidMount() {
    messageData.getUserChannelsFromFirebase(channels => {
      this.setState({ channels });
    });
  }

  render() {
    return (
      <div className={`w-${this.props.isMobile?"full":"1/3"} max-w-lg bg-gray-100 overflow-x-hidden p-4 flex flex-col`}>
        <div className="text-center font-bold my-4">
          <i className="fas fa-comment mr-3"></i>Recent chats
        </div>
        {!this.state.channels.length ? (
          <LoadIcon className="m-auto" />
        ) : (
          <div className="flex-grow overflow-auto">
            {this.state.channels.map(channel => {
              return <MessengerContact channelId={channel} key={channel} />;
            })}
          </div>
        )}
        <div className="m-auto text-center">
          <div
            className="rounded-full border p-4 cursor-pointer flex flex-row"
            onClick={() => this.setState({ showContactSelect: true })}><i className="fas fa-plus mt-1 mr-3"></i>create chat</div>
          {this.state.showContactSelect ? (
            <MessageContactSelect
              hideContactSelect={() =>
                this.setState({ showContactSelect: false })
              }
            />
          ) : (
            false
          )}
        </div>
      </div>
    );
  }
}

export default MessengerContacts;
