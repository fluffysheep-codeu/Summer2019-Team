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

import ContributorIntro from 'components/ui/ContributorIntro.js';

/**
 * @param contributor A contributor defined in reducers/contributors.js.
 * @param id A unique id for the contributor.
 * @return The html representation of a contributor's intro.
 */
const createContributorUi = function(contributor, id) {
  return (
    <ContributorIntro
      key={id}
      name={contributor.name}
      subtitle={contributor.subtitle}
      description={contributor.description}
      profilePic={contributor.profilePic}
    />
  );
};

/** Renders the /about page. */
class AboutUs extends Component {
  render() {
    const { contributors } = this.props;
    const contributorsListUi = contributors.keys.map(id =>
      createContributorUi(contributors[id], id)
    );

    return (
      <div className='container' style={{ margin: 5 }}>
        <h1 className='center'>About Our Team</h1>
        {contributorsListUi}
      </div>
    );
  }
}

AboutUs.propTypes = {
  /** A json representation of all contributors on our team. */
  contributors: PropTypes.object
};

/** Maps contributor data from redux to AboutUs. */
const mapStateToProps = function(state) {
  return { contributors: state.contributors };
};

export default connect(mapStateToProps)(AboutUs);
