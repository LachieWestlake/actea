import React from "react";

import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import data from "../../../../../database/data";
import {Debounce} from'react-lodash'

const animatedComponents = makeAnimated();

export interface ContactSelectProps {}

export interface ContactSelectState {}

class ContactSelect extends React.Component<
  ContactSelectProps,
  ContactSelectState
> {
  state = {}
  promiseOptions = async inputValue => {
    let emails = await data.getUserListFromPartialEmail(inputValue);
    return emails.map(email => ({
      value: email.email,
      label: `${email.email} ${email.displayName?`- ${email.displayName}`:""}`
    }));
  };

  render() {
    return (
      <AsyncSelect
        closeMenuOnSelect={false}
        cacheOptions
        components={animatedComponents}
        noOptionsMessage={() => (
          <div>
            <i className="fas fa-search"></i>&emsp;No Results
          </div>
        )}
        isMulti
        loadOptions={this.promiseOptions}
      />
    );
  }
}

export default ContactSelect;
