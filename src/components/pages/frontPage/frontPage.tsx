import * as React from "react";
import { Component } from "react";
import Frontpage_1 from "./parts/frontpage_1";
import Frontpage_2 from "./parts/frontpage_2";
export interface FrontPageProps {}

export interface FrontPageState {}

class FrontPage extends React.Component<FrontPageProps, FrontPageState> {
  state = {};
  render() {
    return (
      <div>
        <Frontpage_1 />
        <Frontpage_2 />
      </div>
    );
  }
}

export default FrontPage;
