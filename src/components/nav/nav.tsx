import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import LoggedOutNav from "./loggedOutNav";
import LoggedInNav from "./loggedInNav";
import { isMobile } from "react-device-detect";
import posed from "react-pose";
export interface NavProps {
  loggedIn: Boolean;
}

export interface NavState {}
const NavOptions = posed.div({
  visible: { height: "auto" },
  hidden: { height: 0 }
});

class Nav extends React.Component<NavProps, NavState> {
  state = { hidden: "hidden" };
  toggleNav = () => {
    if (this.state.hidden) this.setState({ hidden: "" });
    else this.setState({ hidden: "hidden" });
  };
  closeNav = () => {
  if (!this.state.hidden) this.setState({ hidden: "hidden" });
  };

  render() {
    return (
      <nav onClick = {this.closeNav} className="flex items-center top-0 z-50 justify-between flex-wrap bg-teal-400 shadow-lg sticky px-6 py-3">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight no-underline text-white">
              Actea
            </span>
          </Link>
        </div>
        <div onClick={this.toggleNav} className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
            <svg
              className="fill-current text-teal-100 h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <NavOptions
          className={`w-full lg:flex  block flex-grow lg:items-center lg:w-auto overflow-hidden`}
          pose={this.state.hidden && isMobile? 'hidden' : 'visible'}
        >
          {this.props.loggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavOptions>
      </nav>
    );
  }
}

export default Nav;
