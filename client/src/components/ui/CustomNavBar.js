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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { SERVER_OK } from 'constants/webCodes.js';
import grey from '@material-ui/core/colors/grey';
import {
  ABOUT_US,
  HOME,
  LOGIN,
  LOGIN_STATUS,
  LOGOUT,
  USER_PAGE,
  STATS,
  COMMUNITY_PAGE,
  MESSAGE_FEED
} from 'constants/links.js';
import { HIDDEN } from 'constants/css.js';
import { UserDataAction, storeUserData } from 'reducers/userData.js';

const styles = function() {
  return {
    root: {
      width: '100%'
    },
    link: {
      padding: 6,
      textDecoration: 'none'
    },
    text: {
      color: grey[300],
      fontSize: 15
    }
  };
};

/** The common navbar ui used throughout the application. */
class CustomNavBar extends Component {
  componentDidMount() {
    this.fetchLoginStatus();
  }

  /** Fetches the login status of the current user. */
  fetchLoginStatus() {
    fetch(LOGIN_STATUS)
      .then(response =>
        response.status === SERVER_OK ? response.json() : null
      )
      .then(status => {
        const { storeUserData } = this.props;
        if (status) {
          storeUserData(UserDataAction.SET_USER_EMAIL, status.username);
        } else {
          console.log('Error: Server is unavailable.');
        }
      });
  }

  render() {
    const { userEmail } = this.props.userData;
    const hideIfSignedIn = userEmail ? HIDDEN : null;
    const hideIfSignedOut = !userEmail ? HIDDEN : null;
    const { classes } = this.props;

    return (
      <div className='CustomNavBar'>
        <AppBar position='static' color='primary' className={classes.root}>
          <Toolbar>
            <NavLink to={HOME} className={classes.link}>
              <Typography variant='h6' className={classes.text}>
                Home
              </Typography>
            </NavLink>
            <NavLink to={ABOUT_US} className={classes.link}>
              <Typography variant='h6' className={classes.text}>
                About our Team
              </Typography>
            </NavLink>
            <NavLink to={STATS} className={classes.link}>
              <Typography variant='h6' className={classes.text}>
                Stats
              </Typography>
            </NavLink>
            <NavLink
              to={USER_PAGE + '?user=' + userEmail}
              className={`${hideIfSignedOut} ${classes.link}`}>
              <Typography variant='h6' className={classes.text}>
                Your Page
              </Typography>
            </NavLink>
            <NavLink to={COMMUNITY_PAGE} className={classes.link}>
              <Typography variant='h6' className={classes.text}>
                Community Page
              </Typography>
            </NavLink>
            <NavLink to={MESSAGE_FEED} className={classes.link}>
              <Typography variant='h6' className={classes.text}>
                Public Feed
              </Typography>
            </NavLink>
            <a href={LOGIN} className={`${hideIfSignedIn} ${classes.link}`}>
              <Typography variant='h6' className={classes.text}>
                Sign In
              </Typography>
            </a>
            <a href={LOGOUT} className={`${hideIfSignedOut} ${classes.link}`}>
              <Typography variant='h6' className={classes.text}>
                Logout
              </Typography>
            </a>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

CustomNavBar.propTypes = {
  /** The user's data stored in redux. */
  userData: PropTypes.object,
  /** A function to set the user data in redux store. */
  storeUserData: PropTypes.func,
  /** Required by material-io. */
  classes: PropTypes.object.isRequired
};

/** Maps redux store state to class props. */
const mapStateToProps = function(state) {
  return { userData: state.userData };
};

/** Maps actions to userData.js */
const mapDispatchToProps = function(dispatch) {
  return {
    storeUserData: (action, param) => dispatch(storeUserData(action, param))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomNavBar));
