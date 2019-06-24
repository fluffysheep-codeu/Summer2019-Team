/** This file contains the map elements we will render for the webpages */
import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import PropTypes from 'prop-types';

const CustomMap = function(props) {
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  if (Object.keys(props.markers).length) {
    return <GoogleMap defaultCenter={props.center} defaultZoom={props.zoom} />;
  }
  return (
    <GoogleMap defaultCenter={props.center} defaultZoom={props.zoom}>
      {props.markers.keys.map(id => (
        <Marker
          key={props.markers[id].name}
          position={props.markers[id].coord}
          title={props.markers[id].name}
          onClick={() => {
            setSelectedLandmark(props.markers[id]);
          }}
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
};

CustomMap.propTypes = {
  /** The center for the map */
  center: PropTypes.object,
  /** Default zoom for the map when loaded */
  zoom: PropTypes.number,
  /** Object of all the markers */
  markers: PropTypes.shape({
    /** Keys of the markers */
    keys: PropTypes.array
  })
};

CustomMap.defaultProps = {
  markers: {}
};

export default withScriptjs(withGoogleMap(CustomMap));
