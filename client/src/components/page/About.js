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
import { ABOUT_ME_SERVLET } from 'constants/links.js';

/** Renders the /about page. */
class About extends Component {
  state = {
    content: null
  };

  componentDidMount() {
    this.fetchAbout();
  }

  /** Fetches the content for the About page. */
  fetchAbout() {
    //const url = '/about?user=' + parameterUsername;
    fetch(ABOUT_ME_SERVLET)
      .then(response => {
        return response.json();
      })
      .then(aboutMe => {
        const aboutMeContainer = document.getElementById('about-me-container');
        if (aboutMe == '') {
          aboutMe = 'This user has not entered any information yet.';
        }
        aboutMeContainer.innerHTML = aboutMe;
      });
  }

  render() {
    return (
      <p>
        {this.state.content}
        <div id='about-me-container'>About</div>
        <form action='/api/about' method='POST'>
          <textarea />
          <br />
          <input type='submit' value='Submit' />
        </form>
      </p>
    );
  }
}

export default About;
