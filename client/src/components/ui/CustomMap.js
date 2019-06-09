/** This file contains the map elements we will render for the webpages */
import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import ALL_MARKERS from 'components/markers/MarkersData.js';

const GOOGLE_MAPS_API_URL =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyAi9TMtkY74gzfmjPkD7w1Tu-zyABHYlww&v=3.exp&libraries=geometry,drawing,places';
const DEFAULT_MAP_ZOOM = 15;
const CUSTOM_MAP = withScriptjs(withGoogleMap(CustomMapComponent));
const GOOGLEPLEX_COORD = { lat: 37.422, lng: -122.084 };

function CustomMapComponent() {
  const [selectedLandmark, setSelectedLandmark] = useState(null);

  return (
    <GoogleMap defaultCenter={GOOGLEPLEX_COORD} defaultZoom={DEFAULT_MAP_ZOOM}>
      {ALL_MARKERS.keys.map(id => (
        <Marker
          key={ALL_MARKERS[id].name}
          position={ALL_MARKERS[id].coord}
          title={ALL_MARKERS[id].name}
          onClick={() => {
            setSelectedLandmark(ALL_MARKERS[id]);
          }}
          /** This code will replace the normal markers with custom icons
          icon={{
            url: ALL_MARKERS[id].icon,
            scaledSize: new window.google.maps.Size(
              ALL_MARKERS[id].iconSize.x,
              ALL_MARKERS[id].iconSize.y
            )
          }}
          */
        />
      ))}
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

export default { GOOGLE_MAPS_API_URL, CUSTOM_MAP };
