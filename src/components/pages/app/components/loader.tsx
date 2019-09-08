import * as React from "react";
import { Component } from "react";
import LoadIcon from "./loadIcon";

export interface LoaderProps {
  data: any;
}

export interface LoaderState {}

class Loader extends React.Component<LoaderProps, LoaderState> {
  state = {};

  render() {
    if (this.props.data) {
      return this.props.children;
    } else {
      return <LoadIcon />;
    }
  }
}

export default Loader;
