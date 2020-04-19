import { Route, Switch } from "react-router-dom";
import React from "react";
import PostView from "./post-view";
import MapView from "./map-view";
import NotFound from "../universal/not-found";

/**
 * Renders sub-views of the blog
 */
function ViewRoutes({ filteredPosts, toggleFilter }) {
  return (
    <Switch>
      <Route path="/blog/map">
        <MapView filteredPosts={filteredPosts} toggleFilter={toggleFilter} />
      </Route>
      <Route path="/blog/view/:date/:title">
        <PostView filteredPosts={filteredPosts} />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}
// Direct child of app.js, prevent rerender on context update
export default React.memo(ViewRoutes);
