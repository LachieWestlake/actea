import * as React from "react";
import ContactSelect from "./contactSelect";
export interface MessageContactSelectProps {
  hideContactSelect: () => void;
}

export interface MessageContactSelectState {}

class MessageContactSelect extends React.Component<
  MessageContactSelectProps,
  MessageContactSelectState
> {
  state = {};
  render() {
    return (
      <div
        className="absolute flex flex-col items-center left-0 top-0 w-full h-full z-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.63)" }}>
        <div className="container rounded m-auto bg-white shadow-lg p-12">
          <div className="text-right">
            <i
              className="fas fa-times rounded-full border p-4 cursor-pointer"
              onClick={this.props.hideContactSelect}></i>
          </div>
          <div className="text-2xl mb-4">Create New Chat:</div>
          <ContactSelect className="mb-12" />
        </div>
      </div>
    );
  }
}

export default MessageContactSelect;
