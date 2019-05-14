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
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import About from 'components/page/About.js';
import Home from 'components/page/Home.js';
import CustomNavBar from 'components/ui/CustomNavBar.js';
import { ABOUT, HOME } from 'constants/links.js';

/** Renders all components in the <root> element on the page. */
class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <CustomNavBar />
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route exact path={ABOUT} component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;
