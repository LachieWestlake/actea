import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppHome from "../components/pages/app/appHome";
import ProjectPage from "../components/pages/app/projectList/projectPage";
import Project from "../components/pages/app/projectList/project/project";
import Profile from "../components/pages/app/profile/profile";
import EditProfile from "../components/pages/app/profile/editProfile";
import Messenger from "../components/pages/app/messenger/messenger";
class LoggedInRouter extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/app" component={AppHome} />
        <Route exact path="/app/projects" component={ProjectPage} />
        <Route exact path="/app/projects/project/:id" component={Project} />
        <Route exact path="/app/profile/email/:email" component={Profile} />
        <Route exact path="/app/profile/editMyProfile" component={EditProfile} />
        <Route exact path="/app/messenger" component={Messenger} />
        <Route exact path="/app/messenger/channel/:channelId" component={Messenger} />
      </Router>
    );
  }
}

export default LoggedInRouter;
