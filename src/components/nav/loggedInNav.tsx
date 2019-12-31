import * as React from "react";
import { Link } from "react-router-dom";
import authUser from "../../auth/auth";
import { userData } from '../../database/data';

export interface LoggedInNavProps { }

export interface LoggedInNavState { }

class LoggedInNav extends React.Component<LoggedInNavProps, LoggedInNavState> {
  state = { darkModeOn: false };
  logout = () => {
    authUser.signOut();
  }

  componentDidMount() {
    userData.getUserTheme().then(themeOutput => {
      console.log(themeOutput)
      this.setState({ darkModeOn: themeOutput === 'theme-dark' })
    })
  }

  handleThemeChange = (e) => {
    this.setState({ darkModeOn: e.target.checked })
    if (e.target.checked) {
      userData.setUserTheme('theme-dark')
    }
    else {
      userData.setUserTheme('theme-light')
    }
  }



  render() {


    console.log(this.state.darkModeOn)
    return (
      <React.Fragment>
        <div className="text-sm lg:flex-grow">
        </div>
        <div>
          <div className="block mt-4 lg:inline-block lg:mt-0 text-black mr-2">dark mode</div>
          <input type="checkbox" className={'mr-4'} onChange={this.handleThemeChange} defaultChecked={this.state.darkModeOn} />
          <Link
            to="/app"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4"
          >
            About
          </Link>
          <a
            href={`/app/profile/email/${authUser.getEmail()}`}
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-black hover:text-white"
          >
            My Profile
          </a>
          <a
            href={`/app/messenger`}
            className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-black hover:text-white"
          >
            Messages
          </a>
          <a
            href="#"
            onClick={this.logout}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"
          >
            Logout
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default LoggedInNav;
