import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a title and description. Used as a placard for team members listed
 * in the about page.
 * @return The html representation of the TeamIntroCard.
 */
const TeamIntroCard = function(props) {
  return (
    <div className='TeamIntroCard'>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
    </div>
  );
};

TeamIntroCard.propTypes = {
  /** The name of the team member. */
  name: PropTypes.string,
  /** A description about the team member. */
  description: PropTypes.string
};

export default TeamIntroCard;
