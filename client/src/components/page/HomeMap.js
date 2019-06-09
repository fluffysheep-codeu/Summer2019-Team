/** This file contains the map elements we will render for the webpages */
import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import youtubeIcon from 'statics/images/youtubeIcon.png';
import stanTrex from 'statics/images/stanTrex.png';
import bikeIcon from 'statics/images/bikeIcon.svg';

const GOOGLE_MAPS_API_URL =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyAi9TMtkY74gzfmjPkD7w1Tu-zyABHYlww&v=3.exp&libraries=geometry,drawing,places';
const DEFAULT_MAP_ZOOM = 15;
const HOME_MAP = withScriptjs(withGoogleMap(HomeMapComponent));
const GOOGLEPLEX_COORD = { lat: 37.422, lng: -122.084 };
const GOOGLE_WEST_CAMPUS = {
  name: 'Google West Campus',
  coord: { lat: 37.423829, lng: -122.092154 },
  description: 'Google West Campus is home to YouTube and Maps.',
  icon: youtubeIcon
};
const STAN_TREX = {
  name: 'Stan the T-Rex',
  coord: { lat: 37.421903, lng: -122.084674 },
  description: 'This is Stan, the T-Rex statue.',
  icon: stanTrex
};
const PERMANENTE_CREEK_TRAIL = {
  name: 'Permanente Creek Trail',
  coord: { lat: 37.420919, lng: -122.086619 },
  description:
    'Permanente Creek Trail connects Google to a system of bike trails.',
  icon: bikeIcon
};

function HomeMapComponent() {
  const [selectedLandmark, setSelectedLandmark] = useState(null);

  return (
    <GoogleMap defaultCenter={GOOGLEPLEX_COORD} defaultZoom={DEFAULT_MAP_ZOOM}>
      <Marker
        key='West Campus'
        position={GOOGLE_WEST_CAMPUS.coord}
        title='Google West Campus'
        onClick={() => {
          setSelectedLandmark(GOOGLE_WEST_CAMPUS);
        }}
        icon={{
          url: GOOGLE_WEST_CAMPUS.icon,
          scaledSize: new window.google.maps.Size(25, 18)
        }}
      />
      <Marker
        key='Stan T-Rex'
        position={STAN_TREX.coord}
        title='Stan the T-Rex'
        onClick={() => {
          setSelectedLandmark(STAN_TREX);
        }}
        icon={{
          url: STAN_TREX.icon,
          scaledSize: new window.google.maps.Size(35, 35)
        }}
      />
      <Marker
        key='Permanente'
        position={PERMANENTE_CREEK_TRAIL.coord}
        title='Permanente Creek Trail'
        onClick={() => {
          setSelectedLandmark(PERMANENTE_CREEK_TRAIL);
        }}
        icon={{
          url: PERMANENTE_CREEK_TRAIL.icon,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
      />
      {selectedLandmark && (
        <InfoWindow
          position={selectedLandmark.coord}
          onCloseClick={() => {
            setSelectedLandmark(null);
          }}>
          <div>
            <h2>{selectedLandmark.name}</h2>
            <p>{selectedLandmark.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default { GOOGLE_MAPS_API_URL, HOME_MAP };
