import React, { useRef } from "react";
import { Map, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";

// bigger the viewport, lesser the value of the minzoom
const minZoom = (function() {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (vw > 1500) {
    return 3;
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

const posts = [
  {
    position: [49.3380843, -122.4778893],
    id: "evans-peak",
    title: "Evans Peak"
  },
  {
    position: [49.3767417, -123.3905933],
    id: "mount-gardner",
    title: "Mount Gardner"
  },
  {
    position: [49.6173254, -121.155712],
    id: "zupjok-peak",
    title: "Zupjok Peak"
  },
  {
    position: [22.41417, 114.24852],
    id: "hunchbacks",
    title: "The Hunchbacks"
  }
];

export default function LeafletMap() {
  const mapRef = useRef();
  const leaflet = mapRef.current && mapRef.current.leafletElement;
  const markers = posts.map(post => (
    <Marker position={post.position} onclick={onClick} data-id={post.id}>
      <Tooltip>{post.title}</Tooltip>
    </Marker>
  ));

  function onClick(e) {
    console.log("clicked", e.sourceTarget.options["data-id"]);
  }

  return (
    <Map
      ref={mapRef}
      center={init.position}
      zoom={init.zoom}
      minZoom={minZoom}
      style={{ height: "calc(100vh - 64px)" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>{markers}</MarkerClusterGroup>
    </Map>
  );
}
