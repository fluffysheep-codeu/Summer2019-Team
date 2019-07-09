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

const GOOGLE_MAPS_API_URL =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyAi9TMtkY74gzfmjPkD7w1Tu-zyABHYlww&v=3.exp&libraries=geometry,drawing,places';
const DEFAULT_MAP_ZOOM = 1;
const CENTER_EARTH = { lat: 20, lng: 0 };
const GOOGLE_MAPS_API = 'AIzaSyAi9TMtkY74gzfmjPkD7w1Tu-zyABHYlww';

const buildMessages = function(content) {
  return (
    <Message
      user={content.user}
      timestamp={content.timestamp}
      text={content.text}
    />
  );
};

class PublicFeed extends Component {
  state = {
    content: null,
    address: null
  };

  markers = {};

  componentDidMount() {
    this.fetchMessages();
    this.fetchRestaurants();
  }

  fetchMessages() {
    fetch(MESSAGE_FEED_SERVLET)
      .then(response => {
        return response.json();
      })
      .then(content => {
        this.setState({ content: content });
      });
  }

  fetchRestaurants() {
    fetch(RESTAURANT_SERVLET)
      .then(response => {
        return response.json();
      })
      .then(content => {
        this.setState({ restaurants: JSON.stringify(content) });
        console.log(this.state.restaurants);
        const restaurantList = !this.state.restaurants
          ? null
          : JSON.parse(this.state.restaurants);
        var key = 1;
        if (restaurantList) {
          for (const [restName, addBio] of Object.entries(restaurantList)) {
            this.markers[key] = {};
            this.markers[key].name = restName;
            this.markers[key].description = addBio[Object.keys(addBio)[0]];
            // Here we perform the Geocoding to get the latitude and longitude
            const address = Object.keys(addBio)[0]
              .split(' ')
              .join('+');
            const httpAddress =
              'https://maps.googleapis.com/maps/api/geocode/json?address=' +
              address +
              '&key=' +
              GOOGLE_MAPS_API;
            this.fetchCoordinates(httpAddress, key);
            if (key === 1) {
              this.markers.keys = [key];
            } else {
              this.markers.keys.push(key);
            }
            key++;
          }
        }
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

  render() {
    const value = this.state.content;
    const messageList = value
      ? value.map(content => buildMessages(content))
      : null;
    const hideIfFullyLoaded = !messageList ? null : HIDDEN;
    return (
      <div id='content' style={{ margin: 5 }}>
        <h1>Make a Post</h1>
        <hr />
        Add Your Favorite Restaurant's Name!
        <br />
        <form action={RESTAURANT_SERVLET} method='POST'>
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
