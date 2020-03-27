import React, { useRef } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import useUrlState from "../../../../hooks/useUrlState";
import useTransformedIndexData from "../../../../hooks/useTransformedIndexData";
import { getKeyFromIndex, constructPath } from "../../../../util/url-util";
import { appbarHeight } from "../../universal/appbar";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Map, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

const minZoom = (function() {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (vw > 1500) {
    return 3;
  }
  if (vw > 1200) {
    return 2.5;
  }
  return 1;
})();

const init = {
  position: [20, 20],
  zoom: minZoom
};

const posts = [
  {
    latlng: [49.3380843, -122.4778893],
    title: "Carousel Test",
    date: "2020-01-16"
  },
  {
    latlng: [49.3767417, -123.3905933],
    title: "Embedded Video Test",
    date: "2020-01-16"
  },
  {
    latlng: [49.6173254, -121.155712],
    title: "Image Test",
    date: "2020-01-10"
  },
  {
    latlng: [22.41417, 114.24852],
    title: "Cover Photo Test",
    date: "2020-01-07"
  }
];

/**
 *
 * @param {*} param0
 */
export default function LeafletMap({ filteredPosts, toggleFilter }) {
  document.title = "Trip Reports";

  const mapRef = useRef();
  const history = useHistory();
  const { collection, filters } = useUrlState();
  const { keyToPostMap } = useTransformedIndexData(posts);
  const filtersPresent = filters && Object.keys(filters).length;

  const markers = posts.map(post => {
    const key = getKeyFromIndex(post);
    return (
      <Marker position={post.latlng} onclick={onClick} key={key} data-key={key}>
        <Tooltip>{post.title}</Tooltip>
      </Marker>
    );
  });

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

  function openFilters() {
    toggleFilter(true);
  }

  return (
    <MapContainer>
      <FilterButton active={filtersPresent} onClick={openFilters} type="button">
        <SearchOutlinedIcon />
      </FilterButton>
      <Map
        ref={mapRef}
        center={init.position}
        zoom={init.zoom}
        minZoom={minZoom}
        zoomDelta={0.5}
        zoomSnap={0.5}
        maxBounds={[
          [-90, -180],
          [90, 180]
        ]}
        style={MapStyles}
      >
        <TileLayer
          noWrap={true}
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>{markers}</MarkerClusterGroup>
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

const FilterButton = styled.button`
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
  top: 70px;
  left: 10px;
  text-align: center;

  color: ${props => (props.active ? "rgb(255,69,0)" : "black")};
  box-shadow: ${props =>
    props.active
      ? "0 1px 5px rgba(255,69,0,0.65)"
      : "0 1px 5px rgba(0,0,0,0.65)"};
`;
