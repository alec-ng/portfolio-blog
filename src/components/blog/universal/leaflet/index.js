import React from "react";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import { MapContainer, MapStyles } from "./styles";

const config = {
  maxBoundsViscosity: 1,
  maxBounds: [
    [-65, -180],
    [90, 180]
  ],
  zoomDelta: 0.5,
  zoomSnap: 0.5,
  minZoom: getResponsiveMinZoom(),
  center: [20, 20],
  zoom: getResponsiveMinZoom(),
  style: MapStyles
};

/**
 * Renders a memozized leaflet map using OpenStreetMap tiles, only rerendering
 * on marker change. Groups all markers together using MarkerClusterGroup
 *
 */
const ReactLeaflet = ({ mapRef, groupRef, markers, children }) => (
  <MapContainer id="react-leaflet-container">
    {children}
    <Map ref={mapRef} {...config}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={groupRef}>
        <MarkerClusterGroup>{markers}</MarkerClusterGroup>
      </FeatureGroup>
    </Map>
  </MapContainer>
);

export default ReactLeaflet;
export { FilterButton, ZoomOutButton } from "./styles";

// -------------- UTIL

function getResponsiveMinZoom() {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (vw > 1500) {
    return 2.5;
  }
  if (vw > 1200) {
    return 2;
  }
  return 1;
}
