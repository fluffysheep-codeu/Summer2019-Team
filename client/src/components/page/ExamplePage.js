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
import { EXAMPLE_PAGE_SERVLET } from 'constants/links.js';

/** Renders the /example-page page. */
class ExamplePage extends Component {
  state = {
    content: null
  };

  componentDidMount() {
    this.fetchExamplePage();
  }

  /** Fetches the content for the example page. */
  fetchExamplePage() {
    fetch(EXAMPLE_PAGE_SERVLET)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ content: data.content });
      });
  }

  render() {
    return <p>{this.state.content}</p>;
  }
}

export default ExamplePage;
