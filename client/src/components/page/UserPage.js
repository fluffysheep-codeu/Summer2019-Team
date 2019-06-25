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
import Message from 'components/ui/Message.js';
import { ABOUT_ME_SERVLET } from '../../constants/links';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

/** Gets the parameters from the url. Parameters are after the ? in the url. */
const urlParams = new URLSearchParams(window.location.search);
/** The email of the currently displayed user. */
const userEmailParam = urlParams.get('user');
/** Message url */
const url1 = MESSAGE + '?user=' + userEmailParam;
/** About url */
const url2 = ABOUT_ME_SERVLET + '?user=' + userEmailParam;
/** Promises */
const promises = Promise.all([fetch(url1), fetch(url2)]);
/* User-Entered Message */
var editorMessage = null;
/* User-Entered About */
var editorAbout = null;

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

const submitMessage = function() {
  fetch(MESSAGE, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: 'text=' + editorMessage
  });
  window.location.reload();
};

const submitAboutMe = function() {
  fetch(ABOUT_ME_SERVLET, {
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
    about: null
  };

  componentDidMount() {
    promises
      .then(results => Promise.all(results.map(r => r.clone().json())))
      .then(results => {
        const [messages, about] = results;
        this.setState({ messages, about });
      });
  }

  render() {
    const { messages, about } = this.state;

    const { userEmail } = this.props.userData;

    // A boolean that checks whether the current logged in user is viewing
    // another user's page. Some controls such as the message form will hide if
    // the user is not viewing their own page.
    const hiddenIfViewingOther = userEmail !== userEmailParam ? HIDDEN : null;
    const hiddenIfHasMessages = messages > 0 ? HIDDEN : null;

    const messagesUi = messages
      ? messages.map(message => createMessageUi(message))
      : null;

    const aboutUi = about ? about.content : null;

    return (
      <div className='container'>
        <h1 className='center'>{userEmailParam}</h1>
        Enter a new message:
        <br />
        <CKEditor
          editor={ClassicEditor}
          onInit={editor => {}}
          onChange={(event, editor) => {
            editorMessage = editor.getData();
          }}
        />
        <button onClick={submitMessage}>Submit</button>
        <br />
        {aboutUi}
        <CKEditor
          editor={ClassicEditor}
          onInit={editor => {}}
          onChange={(event, editor) => {
            editorAbout = editor.getData();
          }}
        />
        <button onClick={submitAboutMe}>Submit</button>
        <br className={hiddenIfViewingOther} />
        <hr />
        <p className={hiddenIfHasMessages}>This user has no posts yet.</p>
        {messagesUi}
      </div>
    );
  }
}

UserPage.propTypes = {
  /** A json of the user data. */
  userData: PropTypes.object
};

/** Maps user data from redux to UserPage. */
const mapStateToProps = function(state) {
  return { userData: state.userData };
};

export default connect(mapStateToProps)(UserPage);
