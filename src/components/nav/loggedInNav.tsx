import * as React from "react";
import { Link } from "react-router-dom";
import authUser from "../../auth/auth";
import { userData } from '../../database/data';
import store from 'store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

export interface LoggedInNavProps { }

export interface LoggedInNavState { }

class LoggedInNav extends React.Component<LoggedInNavProps, LoggedInNavState> {
  logout = () => {
    authUser.signOut();
  }

  handleThemeChange = (e) => {
    let currentTheme = store.get('theme')
    if(currentTheme === 'theme-light'){
      store.set('theme', 'theme-dark')
    }
    else{
      store.set('theme', 'theme-light')
    }


    // if (e.target.checked) {
    //   store.set('theme', 'theme-dark')
    // }
    // else {
    //  store.set('theme', 'theme-light')
    // }
    window.location.reload()
  }

  render() {
    return (
      <React.Fragment>
        <div className="text-sm lg:flex-grow">
        </div>
        <div>
        <FontAwesomeIcon icon={store.get('theme')==='theme-dark' ? faMoon : faSun} onClick={this.handleThemeChange} className={'mr-4'}/> 
          <Link
            to="/app"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-800 p-2 rounded hover:bg-red-100 mr-4"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-800 p-2 rounded hover:bg-red-100 mr-4"
          >
            About
          </Link>
          <Link
            to={`/app/profile/email/${authUser.getEmail()}`}
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-800 p-2 rounded hover:bg-red-100 mr-4"
          >
            My Profile
          </Link>
          <Link
            to={`/app/messenger`}
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-800 p-2 rounded hover:bg-red-100 mr-4"
          >
            Messages
          </Link>
          <Link
            to="#"
            onClick={this.logout}
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-red-800 p-2 rounded hover:bg-red-100 mr-4"
          >
            Logout
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default LoggedInNav;
