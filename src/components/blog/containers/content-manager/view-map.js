import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import useUrlState from "../../../../hooks/useUrlState";
import useTransformedIndexData from "../../../../hooks/useTransformedIndexData";
import { getKeyFromIndex, constructPath } from "../../../../util/url-util";
import { appbarHeight } from "../../universal/appbar";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ZoomOutMapOutlinedIcon from "@material-ui/icons/ZoomOutMapOutlined";
import { Map, TileLayer, Marker, Tooltip, FeatureGroup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import MaterialTooltip from "@material-ui/core/Tooltip";
import "react-leaflet-markercluster/dist/styles.min.css";

const mockCoords = [
  [49.3380843, -122.4778893],
  [49.3767417, -123.3905933],
  [49.6173254, -121.155712],
  [22.41417, 114.24852],
  [44.21371, 18.799537],
  [45.18978, 19.371818],
  [51.567965, 7.635721]
];

function getMockData(filteredPosts) {
  if (!filteredPosts) {
    return [];
  }
  return filteredPosts.map((post, i) =>
    Object.assign({}, post, {
      latlng: mockCoords[i % mockCoords.length]
    })
  );
}

const minZoom = (function() {
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
})();

const init = {
  position: [20, 20],
  zoom: minZoom
};

/**
 *
 * @param {*} param0
 */
export default function LeafletMap({ filteredPosts, toggleFilter }) {
  useEffect(() => {
    document.title = "Map";
  }, []);

  /**
   * Fit bounds when marker set changes
   * https://stackoverflow.com/questions/50861984/how-do-you-call-fitbounds-when-using-leaflet-react
   */
  const mapRef = useRef();
  const groupRef = useRef();
  const memoZoomOut = useCallback(() => {
    zoomOut();
  }, []);

  useEffect(() => {
    memoZoomOut();
  }, [filteredPosts, mapRef, groupRef, memoZoomOut]);

  function zoomOut() {
    if (!mapRef.current || !groupRef.current) {
      return;
    }
    const map = mapRef.current.leafletElement;
    const featureGroup = groupRef.current.leafletElement;
    if (!featureGroup.getBounds().isValid()) {
      return;
    }
    map.fitBounds(featureGroup.getBounds());
  }

  /**
   * Navigate to clicked post
   */
  const { keyToPostMap } = useTransformedIndexData(filteredPosts);
  const { collection, filters } = useUrlState();
  const history = useHistory();
  function onClick(e) {
    const key = e.sourceTarget.options["data-key"];
    const postToNavigate = keyToPostMap[key.toUpperCase()];
    const newUrl = constructPath(
      collection,
      postToNavigate.date,
      postToNavigate.title,
      filters
    );
    history.push(newUrl);
  }

  const filtersPresent = filters && Object.keys(filters).length;
  function openFilters() {
    toggleFilter(true);
  }

  const markers = getMockData(filteredPosts).map(post => {
    const key = getKeyFromIndex(post);
    return (
      <Marker position={post.latlng} onclick={onClick} key={key} data-key={key}>
        <Tooltip>{post.title}</Tooltip>
      </Marker>
    );
  });

  return (
    <MapContainer id="react-leaflet-container">
      <MaterialTooltip title="Search" placement="right">
        <FilterButton
          active={filtersPresent}
          onClick={openFilters}
          type="button"
        >
          <SearchOutlinedIcon />
        </FilterButton>
      </MaterialTooltip>
      <MaterialTooltip title="Zoom to Fit" placement="right">
        <ZoomOutButton onClick={zoomOut} type="button">
          <ZoomOutMapOutlinedIcon />
        </ZoomOutButton>
      </MaterialTooltip>
      <Map
        ref={mapRef}
        center={init.position}
        zoom={init.zoom}
        minZoom={minZoom}
        zoomDelta={0.5}
        zoomSnap={0.5}
        maxBoundsViscosity={1}
        maxBounds={[
          [-65, -180],
          [90, 180]
        ]}
        style={MapStyles}
      >
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

// ------------- STYLES

const MapContainer = styled.div`
  position: relative;
`;

const MapStyles = {
  height: `calc(100vh - ${appbarHeight})`
};

const BaseMapButton = styled.button`
  /* styles to match leaflet */
  background-color: white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  text-decoration: none;
  color: black;
  position: absolute;
  text-align: center;
  color: black;
  &:hover {
    background-color: #f4f4f4;
  }

  /* custom styles */
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 0;
  width: 26px;
  height: 26px;
  border-radius: 5px;
  z-index: 401;
  position: absolute;
  text-align: center;
  left: 20px;

  color: ${props => (props.active ? "rgb(255,69,0)" : "black")};
  box-shadow: ${props =>
    props.active
      ? "0 1px 5px rgba(255,69,0,0.65)"
      : "0 1px 5px rgba(0,0,0,0.65)"};
`;

const FilterButton = styled(BaseMapButton)`
  top: 70px;
`;

const ZoomOutButton = styled(BaseMapButton)`
  top: 105px;
`;
