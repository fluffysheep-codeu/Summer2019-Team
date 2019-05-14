/**
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { SERVER_OK } from 'constants/webCodes.js';
import { ABOUT, HOME, LOGIN, LOGIN_STATUS, LOGOUT } from 'constants/links.js';
import { setIsFetching, setIsLoggedIn, setEmail } from 'reducers/user.js';

/** The common navbar ui used throughout the application. */
class CustomNavBar extends Component {
  componentDidMount() {
    const { setIsFetching } = this.props;

    setIsFetching(true);
    this.fetchLoginStatus();
  }

  /** Fetches the login status of the current user. */
  fetchLoginStatus() {
    fetch(LOGIN_STATUS)
      .then(response =>
        response.status === SERVER_OK ? response.json() : null
      )
      .then(status => {
        const { setIsFetching, setEmail, setIsLoggedIn } = this.props;

        setIsFetching(false);
        if (status) {
          setIsLoggedIn(status.isLoggedIn);
          setEmail(status.email);
        } else {
          console.log('Error: Server is unavailable.');
        }
      });
  }

  render() {
    const { isFetching, isLoggedIn } = this.props;

    const homeUi = <NavLink to={HOME}>Home</NavLink>;
    const aboutUi = <NavLink to={ABOUT}>About the Team</NavLink>;
    const logoutUi = <a href={LOGOUT}>Logout</a>;
    const loginUi = <a href={LOGIN}>Sign in</a>;
    const loginLogoutUi = !isFetching && isLoggedIn ? logoutUi : loginUi;

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

CustomNavBar.propTypes = {
  /** Whether the user data is being fetched from the server. */
  isFetching: PropTypes.bool,
  /** Whether the  user is logged in. */
  isLoggedIn: PropTypes.bool,
  /** The email of the user. */
  email: PropTypes.string,
  /** A function to set isFetching in redux store. */
  setIsFetching: PropTypes.func,
  /** A function to set isLoggedIn in redux store. */
  setIsLoggedIn: PropTypes.func,
  /** A function to set the user's email in redux store. */
  setEmail: PropTypes.func
};

/** Maps redux store state to class props. */
const mapStateToProps = function(state) {
  return {
    isFetching: state.user.isFetching,
    isLoggedIn: state.user.isLoggedIn,
    email: state.user.email
  };
};

/** Maps redux store dispatch functions to class props. */
const mapDispatchToProps = function(dispatch) {
  return {
    setIsFetching: v => dispatch(setIsFetching(v)),
    setIsLoggedIn: v => dispatch(setIsLoggedIn(v)),
    setEmail: v => dispatch(setEmail(v))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomNavBar);
