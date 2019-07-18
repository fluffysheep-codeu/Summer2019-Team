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
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import background_icon from 'statics/images/food_icon.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import { SEARCH_SERVLET } from 'constants/links.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = function() {
  return {
    root: {
      height: '100vh',
      width: '100%',
      backgroundImage: `url(${background_icon})`
    },
    paper: {
      marginTop: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '30%',
      width: '75%',
      marginLeft: '20%',
      marginRight: '20%',
      backgroundColor: grey[50],
      borderStyle: 'solid',
      borderColor: blue[300]
    },
    avatar: {
      margin: 24,
      fontSize: 50
    },
    submit: {
      margin: 1,
      marginTop: 6
    },
    inputRoot: {
      width: '100%',
      borderStyle: 'solid',
      color: grey[300]
    },
    inputInput: {
      padding: '10px',
      width: '100%'
    }
  };
};

/** User-Entered Value */
var searchVal = null;
/** Search url */
const url = SEARCH_SERVLET + '?query=' + searchVal;
/** Promises */
const promises = Promise.all([fetch(url)]);

const submitSearch = function() {
  fetch(SEARCH_SERVLET, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: 'search=' + searchVal
  });
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null
    };
  }

  componentDidMount() {
    promises
      .then(results => Promise.all(results.map(r => r.clone().json())))
      .then(results => {
        const [content] = results;
        this.setState({ content });
      });
  }

  handleOnChange = event => {
    searchVal = event.target.value;
  };

  updateData(data) {
    this.setState({ data });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid className={classes.paper}>
          <Typography className={classes.avatar} component='h1' variant='h5'>
            Tip of My Tongue
          </Typography>
          <form
            action={SEARCH_SERVLET}
            method='POST'
            id='searchIn'
            style={{ width: '70%', textAlign: 'center' }}>
            <TextField
              name='search'
              variant='outlined'
              fullWidth
              className={{ root: classes.inputRoot, input: classes.inputInput }}
              noValidate
              label='Search posts...'
            />
            <Button
              type='submit'
              value='Search'
              color='primary'
              variant='contained'
              onChange={event => {
                searchVal = document.getElementById('searchIn', event).value;
              }}
              style={{ marginTop: 10 }}>
              Search
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  /** Required by material-io. */
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);
