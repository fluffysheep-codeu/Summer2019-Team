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
import { MESSAGE_FEED_SERVLET, TRANSLATION_SERVLET } from 'constants/links.js';
import Message from 'components/ui/Message.js';
import { HIDDEN } from 'constants/css.js';

const buildMessages = function(content) {
  return (
    <Message
      user={content.user}
      timestamp={content.timestamp}
      text={content.text}
    />
  );
};

class PublicFeed extends Component {
  state = {
    content: null
  };

  componentDidMount() {
    this.fetchMessages();
  }
  fetchMessages() {
    fetch(MESSAGE_FEED_SERVLET)
      .then(response => {
        return response.json();
      })
      .then(content => {
        this.setState({ content: content });
      });
  }

  /** Translates the text of an individual message and updates state */
  buildTranslatedMessages(content, index, languageCode) {
    const url =
      TRANSLATION_SERVLET +
      '?text=' +
      content.text.toString() +
      '&languageCode=' +
      languageCode.toString();
    fetch(url, {
      method: 'POST'
    })
      .then(response => response.text())
      .then(translatedMessage => {
        content.text = translatedMessage;
        const new_messages = this.state.content;
        new_messages[index] = content;
        this.setState({ content: new_messages });
      });
  }

  /** Called by clicking the button and translates all the messages and updates state */
  requestTranslation(languageCode) {
    const messages = this.state.content;
    const translatedMessages = messages
      ? messages.map((content, index) =>
          this.buildTranslatedMessages(content, index, languageCode)
        )
      : null;
    this.setState({ translatedMessages });
  }

  render() {
    const value = this.state.content;
    const messageList = value
      ? value.map(content => buildMessages(content))
      : null;
    const hideIfFullyLoaded = !messageList ? null : HIDDEN;
    return (
      <div id='content' style={{ margin: 5 }}>
        <h1>Post Feed</h1>
        <div className={hideIfFullyLoaded}>Loading...</div>
        <hr />
        <ul>{messageList}</ul>

        <select id='language'>
          <option value='es'>English</option>
          <option value='zh'>Chinese</option>
          <option value='es'>Spanish</option>
          <option value='hi'>Hindi</option>
          <option value='ar'>Arabic</option>
        </select>
        <button
          onClick={e =>
            this.requestTranslation(
              document.getElementById('language', e).value
            )
          }>
          Translate
        </button>
      </div>
    );
  }
}

export default PublicFeed;
