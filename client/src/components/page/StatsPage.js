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
import { STATS_SERVLET } from 'constants/links.js';

/** Renders the /stats page. */
class StatsPage extends Component {
  state = {
    messageCount: null
  };

  componentDidMount() {
    this.fetchStatsPage();
  }

  /** Fetches the content for the Stats page. */
  fetchStatsPage() {
    fetch(STATS_SERVLET)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ messageCount: data.messageCount });
      });
  }

  render() {
    return (
      <p>
        The total number of messages:
        {this.state.messageCount}
      </p>
    );
  }
}

export default StatsPage;
