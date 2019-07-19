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
import {
  MESSAGE_FEED_SERVLET,
  TRANSLATION_SERVLET,
  RESTAURANT_SERVLET
} from 'constants/links.js';
import Message from 'components/ui/Message.js';
import { HIDDEN } from 'constants/css.js';
import CustomMap from 'components/ui/CustomMap.js';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const GOOGLE_MAPS_API_URL =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyAi9TMtkY74gzfmjPkD7w1Tu-zyABHYlww&v=3.exp&libraries=geometry,drawing,places';
const DEFAULT_MAP_ZOOM = 1;
const CENTER_EARTH = { lat: 20, lng: 0 };
/** Promises */
const promises = Promise.all([
  fetch(MESSAGE_FEED_SERVLET),
  fetch(RESTAURANT_SERVLET)
]);
var currRest = { name: null, address: null, caption: null };

const useStyles = function() {
  return {
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: 10,
      marginRight: 10,
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  };
};

const buildMessages = function(content) {
  return (
    <Message
      user={content.user}
      timestamp={content.timestamp}
      text={content.text}
    />
  );
};

const submitRestaurant = function() {
  fetch(RESTAURANT_SERVLET, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body:
      'name=' +
      currRest.name +
      '?address=' +
      currRest.address +
      '?bio=' +
      currRest.caption
  });
};

class PublicFeed extends Component {
  state = {
    content: null,
    restaurants: null
  };

  markers = {};

  componentDidMount() {
    promises
      .then(results => Promise.all(results.map(r => r.clone().json())))
      .then(results => {
        const [messageFeed, restaurant] = results;
        this.setState({ content: messageFeed, restaurants: restaurant });
      });
  }

  /** Will fetch the coordinates of an address */
  fetchCoordinates(address, key) {
    fetch(address)
      .then(response => response.json())
      .then(responseJson => {
        this.markers[key].coord = responseJson.results[0].geometry.location;
      });
  }

  /** Translates the text of an individual message and updates state */
  buildTranslatedMessages(content, index, languageCode) {
    const url =
      TRANSLATION_SERVLET +
      '?text=' +
      content.text.toString() +
      '&languageCode=' +
      languageCode.toString();
    fetch(url, {
      method: 'POST'
    })
      .then(response => response.text())
      .then(translatedMessage => {
        content.text = translatedMessage;
        const new_messages = this.state.content;
        new_messages[index] = content;
        this.setState({ content: new_messages });
      });
  }

  /** Called by clicking the button and translates all the messages and updates state */
  requestTranslation(languageCode) {
    const messages = this.state.content;
    const translatedMessages = messages
      ? messages.map((content, index) =>
          this.buildTranslatedMessages(content, index, languageCode)
        )
      : null;
    this.setState({ translatedMessages });
  }

  /** Will update the curr restaurant name from a input of a textfield */
  handleChangeName = name => ({ target: { value } }) => {
    currRest.name = value;
  };

  /** Will update the curr restaurant address from a input of a textfield */
  handleChangeAddress = name => ({ target: { value } }) => {
    currRest.address = value;
  };

  /** Will update the curr restaurant address from a input of a textfield */
  handleChangeCaption = name => ({ target: { value } }) => {
    currRest.caption = value;
  };

  render() {
    const value = this.state.content;
    const messageList = value
      ? value.map(content => buildMessages(content))
      : null;
    const hideIfFullyLoaded = !messageList ? null : HIDDEN;
    const restaurantList = !this.state.restaurants
      ? null
      : this.state.restaurants;
    var restaurantNames = [];
    if (restaurantList) {
      for (const [restName, bioCoord] of Object.entries(restaurantList)) {
        const latLng = Object.values(bioCoord)[0];
        this.markers[restName] = {
          name: restName,
          coord: {
            lat: Number(Object.keys(latLng)[0]),
            lng: Number(Object.values(latLng)[0])
          },
          description: Object.keys(bioCoord)[0]
        };
        restaurantNames.push(restName);
      }
      this.markers.keys = restaurantNames;
    }
    const classes = useStyles();
    return (
      <div id='content' style={{ margin: 5 }}>
        <h1>Make a Post</h1>
        <hr />
        <form className={classes.container} noValidate autoComplete='off'>
          Add Your Favorite Restaurant's Name!
          <br />
          <TextField
            id='standard-name'
            label='Name'
            className={'Test'}
            margin='normal'
            onChange={this.handleChangeName('name')}
          />
          <br />
          Add the Restaurant's address <br />
          (Ex. 1600 Amphitheatre Pkwy, Mountain View, CA)
          <br />
          <TextField
            id='standard-name'
            label='Location'
            className={'Test'}
            margin='normal'
            onChange={this.handleChangeAddress('address')}
          />
          <br />
          Add Why You Like the Restaurant.
          <br />
          <TextField
            multiline
            rows='4'
            id='standard-name'
            label='Caption'
            className={'Test'}
            margin='normal'
            onChange={this.handleChangeCaption('caption')}
          />
          <br />
          <Button
            onClick={submitRestaurant}
            className={classes.submit}
            variant='contained'
            color='primary'>
            Submit
          </Button>
        </form>
        <form action={RESTAURANT_SERVLET} method='POST'>
          Add Your Favorite Restaurant's Name!
          <br />
          <textarea
            name='name'
            className='message-input'
            style={{ height: `100%`, width: `50%` }}
          />
          <br />
          Add the Restaurant's address <br />
          (Ex. 1600 Amphitheatre Pkwy, Mountain View, CA)
          <br />
          <textarea
            name='address'
            className='message-input'
            style={{ height: `100%`, width: `50%` }}
          />
          <br />
          Add Why You Like the Restaurant.
          <br />
          <textarea
            name='bio'
            className='message-input'
            style={{ height: `100%`, width: `50%` }}
          />
          <br />
          <input type='submit' value='Submit' />
        </form>
        <hr />
        See Others Favorite Restaurants!
        <CustomMap
          center={CENTER_EARTH}
          zoom={DEFAULT_MAP_ZOOM}
          googleMapURL={GOOGLE_MAPS_API_URL}
          markers={this.markers}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `100%`, width: `50%` }} />}
        />
        <h1>Post Feed</h1>
        <div className={hideIfFullyLoaded}>Loading...</div>
        <hr />
        <ul>{messageList}</ul>
        <select id='language'>
          <option value='es'>English</option>
          <option value='zh'>Chinese</option>
          <option value='es'>Spanish</option>
          <option value='hi'>Hindi</option>
          <option value='ar'>Arabic</option>
        </select>
        <button
          onClick={e =>
            this.requestTranslation(
              document.getElementById('language', e).value
            )
          }>
          Translate
        </button>
      </div>
    );
  }
}

export default PublicFeed;
