import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { SERVER_OK } from 'constants/webcodes.js';
import { ABOUT, HOME, LOGIN, LOGIN_STATUS, LOGOUT } from 'constants/links.js';

/** The common navbar ui used throughout the application. */
class CustomNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /** Whether this navbar is fetching login status. */
      isFetching: false,
      /** Whether the user is logged in. */
      isLoggedIn: null,
      /** The user's email. */
      email: null
    };
  }
  componentDidMount() {
    this.setState({ ...this.state, isFetching: true });
    this.fetchLoginStatus();
  }

  /** Fetches the login status of the current user. */
  fetchLoginStatus() {
    fetch(LOGIN_STATUS)
      .then(response =>
        response.status === SERVER_OK ? response.json() : null
      )
      .then(status => {
        if (status) {
          this.setState({
            ...this.state,
            isFetching: false,
            isLoggedIn: status.isLoggedIn,
            email: status.email
          });
        } else {
          console.log('Error: Server is unavailable.');
        }
      });
  }

  render() {
    const { isFetching, isLoggedIn, email } = this.state;
    const homeUi = <NavLink to={HOME}>Home</NavLink>;
    const aboutUi = <NavLink to={ABOUT}>About Our Team</NavLink>;
    const logoutUi = <a href={LOGOUT}>Logout</a>;
    const loginUi = <a href={LOGIN}>Sign in</a>;
    const loginLogoutUi =
      !isFetching && isLoggedIn && email ? logoutUi : loginUi;

    return (
      <div className='CustomNavBar'>
        <nav>
          <ul>
            <li>{homeUi}</li>
            <li>{aboutUi}</li>
            <li>{loginLogoutUi}</li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default CustomNavBar;
