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
import CustomMap from 'components/ui/CustomMap.js';
import HOME_PAGE_MARKERS from 'components/markers/MarkersData.js';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import background_pasta from 'statics/images/food_icon.jpg';
import grey from '@material-ui/core/colors/lightBlue';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const GOOGLE_MAPS_API_URL =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyAi9TMtkY74gzfmjPkD7w1Tu-zyABHYlww&v=3.exp&libraries=geometry,drawing,places';
const DEFAULT_MAP_ZOOM = 15;
const GOOGLEPLEX_COORD = { lat: 37.422, lng: -122.084 };

/**  const theme = createMuiTheme({
  palette: { primary: { main: grey[900] } },
  typography: {
    fontSize: 20,
    fontWeight: 1200
  }
}); */
const styles = function() {
  return {
    root: {
      height: '100vh'
    },
    image: {
      backgroundImage: `url(${background_pasta})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    paper: {
      //margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      //margin: theme.spacing(1),
      //backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%' // Fix IE 11 issue.
      //marginTop: theme.spacing(1)
    },
    submit: {
      //margin: theme.spacing(3, 0, 2)
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
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Tip of My Tongue
            </Typography>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='#' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
