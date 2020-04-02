import React, { useEffect, useCallback } from "react";

import { useHistory } from "react-router-dom";
import useUrlState from "../../../../hooks/useUrlState";
import useTransformedIndexData from "../../../../hooks/useTransformedIndexData";
import { getKeyFromIndex, constructPath } from "../../../../util/url-util";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ZoomOutMapOutlinedIcon from "@material-ui/icons/ZoomOutMapOutlined";
import MaterialTooltip from "@material-ui/core/Tooltip";
import LeafletMap, {
  FilterButton,
  ZoomOutButton
} from "../../universal/leaflet";
import { Marker, Tooltip } from "react-leaflet";

/**
 * Renders a full screen leaflet map, transforming posts into map markers and providing
 * filter/zoomout custom controls
 */
export default function MapView({ filteredPosts, toggleFilter }) {
  useEffect(() => {
    document.title = "Map";
  }, []);

  /**
   * Fit bounds when marker set changes
   */
  const mapRef = React.useRef();
  const groupRef = React.useRef();
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

  /**
   * Filter custom control
   */
  const filtersPresent = filters && Object.keys(filters).length;
  function openFilters() {
    toggleFilter(true);
  }

  /**
   * Generate markers
   */
  const markers = getMockData(filteredPosts).map(post => {
    const key = getKeyFromIndex(post);
    return (
      <Marker position={post.latlng} onclick={onClick} key={key} data-key={key}>
        <Tooltip>{post.title}</Tooltip>
      </Marker>
    );
  });

  return (
    <LeafletMap mapRef={mapRef} groupRef={groupRef} markers={markers}>
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
    </LeafletMap>
  );
}

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
