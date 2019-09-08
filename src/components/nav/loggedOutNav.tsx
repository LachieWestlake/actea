import * as React from "react";
import { Link } from "react-router-dom";

export interface LoggedOutNavProps {}

export interface LoggedOutNavState {}

class LoggedOutNav extends React.Component<
  LoggedOutNavProps,
  LoggedOutNavState
> {
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
            href="//google.com"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white"
          >
            Blog
          </a>
        </div>
        <div>
          <Link to="/login">
            <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">
              Get Started
            </a>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default LoggedOutNav;
