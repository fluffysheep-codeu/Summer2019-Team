import React, { Component } from 'react';

/** Renders the /home page. */
class Home extends Component {
  render() {
    return (
      <div className='container'>
        <h1 className='center'>CodeU Starter Project</h1>
        <p>
          This is the CodeU starter project. Click the links above to login and
          visit your page. You can post messages on your page, and you can visit
          other user pages if you have their URL.
        </p>
        <p>
          This is your code now! Feel free to make changes, and don&apos;t be
          afraid to get creative! You could start by modifying this page to tell
          the world more about your team.
        </p>
      </div>
    );
  }
}

export default Home;
