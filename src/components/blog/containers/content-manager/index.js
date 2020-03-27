import React from "react";
import styled from "styled-components";

import useUrlView from "../../../../hooks/useUrlView";
import { APP_VIEW } from "../../../../util/constants";

import PostView from "./view-post";
import MapView from "./view-map";

/**
 * Component switcher for different views
 */
export default function ContentManager({ filteredPosts }) {
  const view = useUrlView();

  return (
    <main>
      {view === APP_VIEW.post && <PostView filteredPosts={filteredPosts} />}
      {view === APP_VIEW.map && <MapView filteredPosts={filteredPosts} />}
    </main>
  );
}
