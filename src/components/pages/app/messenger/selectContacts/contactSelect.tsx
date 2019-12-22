import React from "react";

import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import data from "../../../../../database/data";
import { Debounce } from "react-lodash";
import authUser from "../../../../../auth/auth";

const animatedComponents = makeAnimated();

export interface ContactSelectProps {
  className?: string;
}

export interface ContactSelectState {
  selected: Array<any>;
}

class ContactSelect extends React.Component<
  ContactSelectProps,
  ContactSelectState
> {
  state = { selected: [] };
  promiseOptions = async inputValue => {
    let emails = await data.getUserListFromPartialEmail(inputValue);
    return emails.map(email => ({
      value: email.email,
      label: `${email.email} ${
        email.displayName ? `- ${email.displayName}` : ""
      }`
    }));
  };

  createChat = async e => {
    if (this.state.selected.length) {
      let myEmail: string = authUser.getEmail() || "";
      let newChannelId = await data.createNewChannel([
        myEmail,
        ...this.state.selected.map(x => x["value"])
      ]);
      window.location.replace(`/app/messenger/channel/${newChannelId}`);
    }
  };
  render() {
    return (
      <>
        <AsyncSelect
          ref={input => input && input.focus()}
          className={this.props.className}
          closeMenuOnSelect={false}
          cacheOptions
          value={this.state.selected}
          onChange={selected => this.setState({ selected })}
          components={animatedComponents}
          noOptionsMessage={() => (
            <div>
              <i className="fas fa-search"></i>&emsp;No Results
            </div>
          )}
          isMulti
          loadOptions={this.promiseOptions}
        />
        <div className="mt-12 pt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={this.createChat}>
            Create
          </button>
        </div>
      </>
    );
  }
}

export default ContactSelect;
