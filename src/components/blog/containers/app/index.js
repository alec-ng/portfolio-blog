import React from "react";
import { withFirebase } from "../../../../hoc/firebase";
import useUrlState from "../../../../hooks/useUrlState";
import usePostIndex from "./usePostIndex";
import useFilterRedirect from "./useFilterRedirect";
import useIndexRedirect from "./useIndexRedirect";
import usePostFilter from "./usePostFilter";

import Fade from "@material-ui/core/Fade";
import ContentManager from "../content-manager";
import SidebarManager from "../sidebar-manager";
import LoadingOverlay from "../../generic/loading-overlay";
import ResponsiveDrawer from "../../generic/drawer";

/**
 * Top level container component for blog
 * Responsible for retrieving filtered subsets of a grouping's published posts
 */
function Blog({ firebase }) {
  // Initiate a redirect if the collection or filters are not valid
  const { collection, filters } = useUrlState();
  useIndexRedirect(collection);
  useFilterRedirect(filters, collection);

  // Fetch a list containing all published posts of the specified collection
  const { postIndexPending, postIndex } = usePostIndex(collection, firebase);

  // Get a filtered subset if URL specifies any filters to apply
  const filteredPosts = usePostFilter(postIndex, filters, collection);

  return (
    <>
      <LoadingOverlay type="linear" visible={postIndexPending} />
      <Fade in={!postIndexPending}>
        <div className="container-fluid p-0">
          <ResponsiveDrawer content={<ContentManager posts={filteredPosts} />}>
            <SidebarManager
              posts={postIndex}
              pending={postIndexPending}
              filteredPosts={filteredPosts}
            />
          </ResponsiveDrawer>
        </div>
      </Fade>
    </>
  );
}
export default withFirebase(Blog);
