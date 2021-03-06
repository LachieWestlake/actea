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
      <nav onClick = {this.closeNav} className="flex items-center top-0 z-50 justify-between flex-wrap bg-white shadow-lg sticky px-6 py-3 border-t-4 border-primary">
        <div className="flex items-center flex-no-shrink text-black mr-6">
          <img className="w-6 mr-4" src={process.env.PUBLIC_URL + '/img/logo/logo.svg'} />
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight no-underline text-black">
              Actea
            </span>
          </Link>
        </div>
        <div onClick={this.toggleNav} className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-black border-teal-light hover:text-white hover:border-white">
            <svg
              className="fill-current text-black h-3 w-3"
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
