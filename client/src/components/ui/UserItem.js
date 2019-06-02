import React from 'react';
import PropTypes from 'prop-types';

/**
 * A user item card.
 * @return The html representation of the card.
 */
const UserItem = function(props) {
  return <div className='user user-div'>{props.content}</div>;
};

UserItem.propTypes = {
  /** Name of the user posting the message. */
  content: PropTypes.string
};

export default UserItem;
