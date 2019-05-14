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
