import React, { useEffect } from "react";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import { MapContainer, MapStyles, ControlsContainer } from "./styles";

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
export default function ReactLeaflet({
  mapRef,
  groupRef,
  markers,
  onLoad,
  children
}) {
  // Whenever set of markers change, fire initialization cb
  useEffect(() => {
    onLoad();
  }, [onLoad, markers]);

  return (
    <MapContainer id="react-leaflet-container">
      <ControlsContainer>{children}</ControlsContainer>
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
}

export { FilterButton, ZoomOutButton } from "./styles";

// Min zoom should not be a non-integer, otherwise showing individual markers with
// markerclusterer is broken
// https://github.com/YUzhva/react-leaflet-markercluster/issues/93

function getResponsiveMinZoom() {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (vw > 1200) {
    return 2;
  }
  return 1;
}
