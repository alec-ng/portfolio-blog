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
  const markers = filteredPosts.map(post => {
    // HOTFIX: until data is retroactively populated
    const latlng =
      post.lat && post.lng ? [post.lat, post.lng] : [41.68331, 189.8597]; // middle of ocean

    return (
      <Marker
        position={latlng}
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
