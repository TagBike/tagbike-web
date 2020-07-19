import React from 'react';
import LeafletMap from './Leaflet/LeafletMap';
import { customHtmlMarker } from './Leaflet/config';


export default function() {
  return (
    <LeafletMap
        id="map"
        //htmlMarkerList={customHtmlMarker}
    />
            
  );
}
