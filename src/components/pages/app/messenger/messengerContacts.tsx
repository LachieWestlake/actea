import * as React from "react";
import { Component } from "react";
import MessengerContact from "./messengerContact";
import data from "../../../../database/data";
export interface MessengerContactsProps {}

export interface MessengerContactsState {}

class MessengerContacts extends React.Component<
  MessengerContactsProps,
  MessengerContactsState
> {
  state = {channels: []};
  componentDidMount(){
    data.getUserChannelsFromFirebase().then((channels)=>{
      this.setState({channels})
    })
  }
  render() {
    return (
      <div className="w-1/4 ">
        {this.state.channels.map((channel)=>{
          return <MessengerContact channelId={channel} key={channel} />
        })}
      </div>
    );
  }
}

export default MessengerContacts;
