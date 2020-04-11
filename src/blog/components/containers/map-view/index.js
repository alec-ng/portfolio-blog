import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getPostMappings } from "../../../util/post-util";
import { constructViewPath } from "../../../util/url-util";
import useFilters from "../../../hooks/useFilters";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ZoomOutMapOutlinedIcon from "@material-ui/icons/ZoomOutMapOutlined";
import MaterialTooltip from "@material-ui/core/Tooltip";
import { Marker, Tooltip } from "react-leaflet";
import LeafletMap, {
  FilterButton,
  ZoomOutButton
} from "../../universal/leaflet";

/**
 * Renders a full screen leaflet map, transforming posts into map markers and providing
 * filter/zoomout custom controls
 */
function MapView({ filteredPosts, toggleFilter }) {
  useEffect(() => {
    document.title = "Map";
  }, []);

  // Fit bounds when marker set changes
  const mapRef = React.useRef();
  const groupRef = React.useRef();

  function zoomOut() {
    if (!mapRef.current || !groupRef.current) {
      return;
    }
    const map = mapRef.current.leafletElement;
    const featureGroup = groupRef.current.leafletElement;
    if (!featureGroup.getBounds().isValid()) {
      return;
    }

    const markerBounds = featureGroup.getBounds();
    map.fitBounds(markerBounds, { padding: [50, 50] });
  }

  // Navigate to clicked post
  const { idToPostMap } = getPostMappings(filteredPosts);
  const history = useHistory();
  const location = useLocation();

  function onClick(e) {
    const postDataId = e.sourceTarget.options["data-key"];
    const { title, date } = idToPostMap[postDataId];
    history.push(constructViewPath(date, title, location.search));
  }

  // Filter custom control
  const filters = useFilters();
  const filtersPresent = filters && Object.keys(filters).length;
  function openFilters() {
    toggleFilter(true);
  }

  // Generate markers
  const markers = getMockData(filteredPosts).map(post => {
    return (
      <Marker
        position={post.latlng}
        onclick={onClick}
        key={post.postDataId}
        data-key={post.postDataId}
      >
        <Tooltip>{post.title}</Tooltip>
      </Marker>
    );
  });

  return (
    <LeafletMap
      mapRef={mapRef}
      groupRef={groupRef}
      markers={markers}
      onLoad={zoomOut}
    >
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

const isEqual = (prev, next) => {
  return prev.filteredPosts === next.filteredPosts;
};
export default React.memo(MapView, isEqual);

const mockCoords = [
  [49.3380843, -122.4778893],
  [49.3767417, -123.3905933],
  [61.6173254, -89.155712],
  [22.41417, 114.24852],
  [44.21371, 18.799537],
  [45.18978, 19.371818],
  [-42.747012, 171.540063]
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
