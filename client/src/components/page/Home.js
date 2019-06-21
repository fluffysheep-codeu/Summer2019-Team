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
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import InputBase from '@material-ui/core/InputBase';

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
      backgroundColor: grey[50]
    },
    avatar: {
      margin: 24,
      fontSize: 40
    },
    form: {
      width: '90%',
      marginTop: 24,
      marginLeft: 30,
      marginRight: 30
    },
    submit: {
      margin: 1,
      marginTop: 6
    },
    inputRoot: {
      width: '100%',
      borderStyle: 'solid',
      borderColor: blue[300]
    },
    inputInput: {
      padding: '10px',
      width: '100%'
    }
  };
};

/** Renders the /home page. */
class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography className={classes.avatar} component='h1' variant='h5'>
            Tip of My Tongue
          </Typography>
          <form className={classes.form} noValidate>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'Search' }}
              id='outlined-named'
            />
          </form>
        </div>
      </Grid>
    );
  }
}

Home.propTypes = {
  /** Required by material-io. */
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Home);
