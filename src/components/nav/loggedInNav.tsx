import * as React from "react";
import { Link } from "react-router-dom";
import authUser from "../../auth/auth";
export interface LoggedInNavProps {}

export interface LoggedInNavState {}

class LoggedInNav extends React.Component<LoggedInNavProps, LoggedInNavState> {
  state = {};
  logout = () => {
    authUser.signOut();
  }
  render() {
    return (
      <React.Fragment>
        <div className="text-sm lg:flex-grow">
          <Link
            to="/home"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4"
          >
            About
          </Link>
          <a
            href={`/app/profile/email/${authUser.getEmail()}`}
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-teal-100 hover:text-white"
          >
            My Profile
          </a>
          <a
            href={`/app/messenger`}
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-teal-100 hover:text-white"
          >
            Messages
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={this.logout}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"
          >
            Logout
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default LoggedInNav;
