import React, { Component } from 'react';
import { COMMUNITY_PAGE_SERVLET } from 'constants/links.js';
import UserItem from 'components/ui/UserItem.js';

/** Returns the html representation of a single user. */
const buildUserListItem = function(user) {
  return <UserItem key={user} content={user} />;
};

/** Renders the community page. */
class CommunityPage extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList() {
    fetch(COMMUNITY_PAGE_SERVLET)
      .then(response => {
        return response.json();
      })
      .then(users => {
        this.setState({ users: users });
      });
  }

  render() {
    const content = this.state.users;
    const userListUI = content
      ? content.map(user => buildUserListItem(user))
      : null;
    return (
      <div id='content'>
        <h1>Community Page</h1>
        <p>Here is a list of every user who has posted a message:</p>
        <hr />
        <ul>{userListUI}</ul>
      </div>
    );
  }
}

export default CommunityPage;
