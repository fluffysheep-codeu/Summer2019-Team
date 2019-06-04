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

import React, { Component } from "react";
import { MESSAGE_FEED_SERVLET } from "constants/links.js";
import Message from "components/ui/Message.js";
import { HIDDEN } from "constants/css.js";

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

  render() {
    const value = this.state.content;
    const messageList = value
      ? value.map(content => buildMessages(content))
      : null;
    const hideIfFullyLoaded = !messageList ? null : HIDDEN;
    return (
      <div id="content">
        <h1>Message Feed</h1>
        <div className={hideIfFullyLoaded}>Loading...</div>

        <hr />
        <ul>{messageList}</ul>
      </div>
    );
  }
}

export default PublicFeed;
