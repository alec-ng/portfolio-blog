import React from "react";
import useUrlView from "../../../hooks/useUrlView";
import { APP_VIEW } from "../../../util/constants";
import PostView from "./post-view";
import MapView from "./map-view";

/**
 * Component switcher for different views
 */
export default function ContentManager(props) {
  const view = useUrlView();

  return (
    <main>
      {view === APP_VIEW.post && <PostView {...props} />}
      {view === APP_VIEW.map && <MapView {...props} />}
    </main>
  );
}
