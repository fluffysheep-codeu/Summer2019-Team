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

import TeamIntroCard from 'components/ui/TeamIntroCard.js';
import Contributor from 'reducers/contributors.js';

/**
 * @param contributor A single contributor that exists in the
 * root redux store.
 * @param {number} id A unique id for the contributor.
 * @return The html representation of a contributor's introduction.
 */
const renderContributorUi = function(contributor, id) {
  return (
    <TeamIntroCard
      key={id}
      name={contributor.name}
      description={contributor.description}
    />
  );
};

/** Renders the /about page. */
class About extends Component {
  render() {
    const { contributors } = this.props;
    const renderedContributorListUi = contributors.keys.map(id =>
      renderContributorUi(contributors[id], id)
    );

    return (
      <div className='container'>
        <h1 className='center'>About the Team</h1>
        {renderedContributorListUi}
      </div>
    );
  }
}

About.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.instanceOf(Contributor))
};

/** Maps redux store state to class props. */
const mapStateToProps = function(state) {
  return { contributors: state.contributors };
};

export default connect(mapStateToProps)(About);
