import * as React from "react";
import { Component } from "react";
import authUser from "../../../auth/auth";
import { Link } from "react-router-dom";

export interface AppHomeProps {}

export interface AppHomeState {}

class AppHome extends React.Component<AppHomeProps, AppHomeState> {
  state = {};
  render() {
    return (
      <div className="container mx-auto px-3">
        <div className="mt-6">Welcome {authUser.getName()}!</div>
        <div className="flex flex-wrap">
          <Link
            className="w-full md:w-1/4 max-w-xs rounded overflow-hidden shadow-lg mt-6 justify-center h-48 mx-3 px-3 flex flex-wrap content-center text-2xl"
            to="/app/projects"
          >
            View Projects
          </Link>
          <Link to="/app/skills" className="w-full md:w-1/4 max-w-xs rounded overflow-hidden shadow-lg mt-6 justify-center h-48 mx-3 px-3 flex flex-wrap content-center text-2xl">
            View Skills
          </Link>
          <Link to="/app/jobs" className="w-full md:w-1/4 max-w-xs rounded overflow-hidden shadow-lg mt-6 justify-center h-48 mx-3 px-3 flex flex-wrap content-center text-2xl">
            View Jobs
          </Link>
        </div>
      </div>
    );
  }
}

export default AppHome;
