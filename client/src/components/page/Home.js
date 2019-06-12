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
import background_pasta from 'statics/images/background_pasta.jpg';
import grey from '@material-ui/core/colors/grey';

const GOOGLE_MAPS_API_URL =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyAi9TMtkY74gzfmjPkD7w1Tu-zyABHYlww&v=3.exp&libraries=geometry,drawing,places';
const DEFAULT_MAP_ZOOM = 15;
const GOOGLEPLEX_COORD = { lat: 37.422, lng: -122.084 };
const primary = grey[500];

const styles = {
  container: {
    height: '50vh',
    width: '100%',
    background: `url(${background_pasta})`
  }
};

const theme = createMuiTheme({
  palette: { primary: { main: grey[400] } },
  typography: {
    fontSize: 20
  }
});

/** Renders the /home page. */
class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.container}>
          <Typography
            align='center'
            variant='h2'
            className='center'
            color='primary'>
            Tip of Your Tongue
          </Typography>

          <CustomMap
            center={GOOGLEPLEX_COORD}
            zoom={DEFAULT_MAP_ZOOM}
            markers={HOME_PAGE_MARKERS}
            googleMapURL={GOOGLE_MAPS_API_URL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div style={{ height: `300px`, width: '300px' }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Home);
