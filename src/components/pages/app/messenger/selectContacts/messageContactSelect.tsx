import * as React from "react";
import ContactSelect from "./contactSelect";
export interface MessageContactSelectProps {}

export interface MessageContactSelectState {}

class MessageContactSelect extends React.Component<
  MessageContactSelectProps,
  MessageContactSelectState
> {
  state = {};
  render() {
    return (
      <div
        className="absolute flex items-center left-0 top-0 w-full h-full z-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.63)" }}>
        <div className="container rounded m-auto bg-white shadow-lg p-12">
            <div className="text-2xl mb-4">Create New Chat:</div>
            <ContactSelect />
        </div>
      </div>
    );
  }
}

export default MessageContactSelect;
