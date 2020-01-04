import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Nav from "../components/nav/nav";
import FrontPage from "../components/pages/frontPage/frontPage";
import Home from "../components/pages/home";
import About from "../components/pages/about";
import LoginPage from "../components/pages/login/loginPage";
import LoggedInRouter from "./LoggedInRouter";
import authUser from "../auth/auth";
import LoadIcon from "../components/pages/app/components/loadIcon";

class App extends Component {
  state = { loggedIn: "loading" };
  componentDidMount() {
    authUser.onAuthStateChanged(this.checkIfLoggedIn);
  }
  checkIfLoggedIn = user => {
    this.setState({ loggedIn: Boolean(user) });
  };
  loggedInRoutes() {
    if (this.state.loggedIn === "loading") {
      return <LoadIcon className="py-3" />;
    } else if (this.state.loggedIn) {
      return (
        <React.Fragment>
          <Route path="/app" component={LoggedInRouter} />
          <Route
            path="/login"
            render={props => <Redirect {...props} to="/app" />}
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Route path="/login" component={LoginPage} />
          <Route
            path="/app"
            render={props => <Redirect {...props} to="/login" />}
          />
        </React.Fragment>
      );
    }
  }
  render() {
    return (
      <div className="break-words flex flex-col" style={{ height: "100vh" }}>
        <Router>
          <Nav loggedIn={this.state.loggedIn} />
          <Route exact path="/" component={FrontPage} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          {this.loggedInRoutes()}
        </Router>
      </div>
    );
  }
}
export default App;
