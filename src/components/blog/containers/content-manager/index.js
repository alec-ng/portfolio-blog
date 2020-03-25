import React from "react";
import useUrlView from "../../../../hooks/useUrlView";
import { APP_VIEW } from "../../../../util/constants";
import PostView from "./view-post";
import MapView from "./view-map";

export default function ContentManager({ filteredPosts }) {
  const view = useUrlView();

  switch (view) {
    case APP_VIEW.post:
      return <PostView filteredPosts={filteredPosts} />;
    case APP_VIEW.map:
      return <MapView />;
    default: {
      return null;
    }
  }
}
