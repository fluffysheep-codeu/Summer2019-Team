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
import { connect } from 'react-redux';
import 'css/userPage.css';
import { HIDDEN } from 'constants/css.js';
import { MESSAGE } from 'constants/links.js';
import { ImageCard } from 'components/ui/Message.js';
import { MessagesCard } from 'constants/links.js';
import Message from 'components/ui/Message.js';
import {
  ABOUT_ME_SERVLET,
  PROFILE_UPLOAD_SERVLET,
  PROFILE_PIC_SERVLET
} from '../../constants/links';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

/** Gets the parameters from the url. Parameters are after the ? in the url. */
const urlParams = new URLSearchParams(window.location.search);
/** The email of the currently displayed user. */
const userEmailParam = urlParams.get('user');
/** Message url */
const url1 = MESSAGE + '?user=' + userEmailParam;
/** About url */
const url2 = ABOUT_ME_SERVLET + '?user=' + userEmailParam;
/**profile pic url */
const url3 = PROFILE_PIC_SERVLET + '?user=' + userEmailParam;
/** Promises */
const promises = Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
/* User-Entered Message */
var editorMessage = null;
/* User-Entered About */
var editorAbout = 'This is your about me.';

const styles = function() {
  return {
    a: {
      marginLeft: 30,
      marginTop: 10,
      width: 100,
      height: 100,
      justify: 'center',
      marginBottom: 20
    },
    submit: {
      marginTop: 10
    },
    words: {
      fontSize: 18,
      marginLeft: 8
    },
    header: {
      fontSize: 35,
      marginTop: 30,
      fontFamily: 'PT Sans'
    },
    aboutMe: {
      marginLeft: 10,
      marginTop: -40
    }
  };
};

/**
 * @param message A message sent from a user with a timestamp.
 * @return The html representation of a contributor's intro.
 */
const createMessageUi = function(message) {
  return (
    <Message
      key={message.id}
      user={message.user}
      timestamp={message.timestamp}
      text={message.text}
    />
  );
};

const submitMessage = async function() {
  await fetch(MESSAGE, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: 'text=' + editorMessage
  });
  window.location.reload();
};

const submitAboutMe = async function() {
  await fetch(ABOUT_ME_SERVLET, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: 'text=' + editorAbout
  });
  window.location.reload();
};
/** Renders the /user-page page. */
class UserPage extends Component {
  state = {
    messages: null,
    about: null,
    profPic: '',
    photoURL: null
  };

  componentDidMount() {
    promises
      .then(results => Promise.all(results.map(r => r.clone().json())))
      .then(results => {
        const [messages, about, profPic] = results;
        this.setState({ messages, about, profPic });
      });
    this.fetchUrl();
  }

  fetchUrl() {
    fetch(PROFILE_UPLOAD_SERVLET)
      .then(response => {
        return response.text();
      })
      .then(imageUploadUrl => {
        this.setState({ photoURL: imageUploadUrl });
      });
  }

  render() {
    const { messages, about, profPic, photoURL } = this.state;

    const { userEmail } = this.props.userData;
    const { classes } = this.props;

    // A boolean that checks whether the current logged in user is viewing
    // another user's page. Some controls such as the message form will hide if
    // the user is not viewing their own page.

    const hiddenIfViewingOther = userEmail !== userEmailParam ? HIDDEN : null;
    const hiddenIfHasMessages = messages > 0 ? HIDDEN : null;

    const messagesUi = messages
      ? messages.map(message => createMessageUi(message))
      : null;

    //format for setting inner html
    const aboutUi = about ? { __html: about.content } : null;

    return (
      <div className='container' style={{ margin: 10 }}>
        <Grid container spacing={10}>
          <Grid item xs={2}>
            <Avatar
              className={classes.a}
              alt='My profile'
              src={profPic.content}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.header}>{userEmailParam}</Typography>
          </Grid>
          <Grid
            item
            xs={5}
            style={{ height: 30, marginTop: 10, marginLeft: 60 }}>
            <div className={hiddenIfViewingOther}>
              <Typography className={classes.words} variant='h6'>
                Enter your bio:
              </Typography>
              <CKEditor
                editor={ClassicEditor}
                onInit={editor => {}}
                onChange={(event, editor) => {
                  editorAbout = editor.getData();
                }}
              />
              <Button
                onClick={submitAboutMe}
                className={classes.submit}
                variant='contained'
                color='primary'>
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={10}>
          <Grid item xs={2}>
            <form
              className={hiddenIfViewingOther}
              encType='multipart/form-data'
              method='POST'
              action={photoURL}>
              <Typography variant='body1'>Upload a profile picture</Typography>
              <input type='file' name='image' id='image' />
              <input type='submit' value='Submit' />
            </form>
          </Grid>
          <Grid item xs={3} className={classes.aboutMe}>
            <Typography className={classes.words}>
              <p dangerouslySetInnerHTML={aboutUi} />
            </Typography>
          </Grid>
        </Grid>
        <br />
        <div className={hiddenIfViewingOther}>
          <Typography variant='h6' className={classes.words}>
            Enter a new message:
          </Typography>
          <CKEditor
            editor={ClassicEditor}
            onInit={editor => {}}
            onChange={(event, editor) => {
              editorMessage = editor.getData();
            }}
          />
          <Button
            onClick={submitMessage}
            className={classes.submit}
            color='primary'
            variant='contained'>
            Submit
          </Button>
        </div>
        <br />
        <hr />
        {messagesUi}
      </div>
    );
  }
}

UserPage.propTypes = {
  /** A json of the user data. */
  userData: PropTypes.object,
  /**required by material-ui */
  classes: PropTypes.object.isRequired
};

/** Maps user data from redux to UserPage. */
const mapStateToProps = function(state) {
  return { userData: state.userData };
};

export default connect(mapStateToProps)(withStyles(styles)(UserPage));
