import React from "react";
import { withFirebase } from "../../../../hoc/firebase";
import useUrlState from "../../../../hooks/useUrlState";
import usePostIndex from "./usePostIndex";
import useFilterRedirect from "./useFilterRedirect";
import useIndexRedirect from "./useIndexRedirect";
import usePostFilter from "./usePostFilter";
import useUIState, {
  SET_DRAWER_OPEN,
  SET_FILTER_OPEN
} from "../../../../contexts/ui-context";

import Fade from "@material-ui/core/Fade";
import ContentManager from "../content-manager";
import SidebarManager from "../sidebar-manager";
import FilterManager from "../filter-manager";
import LoadingOverlay from "../../generic/loading-overlay";

import SwipeableDrawer from "../../universal/swipable-drawer";
import AppBar, { appbarHeight } from "../../universal/appbar";

/**
 * Top level container component for blog
 * High level layout & retrieves a grouping's published posts
 */
function Blog({ firebase }) {
  /**
   * Synchronize filters and published collection data
   * Validate and redirect if needed
   */
  const { collection, filters } = useUrlState();
  useIndexRedirect(collection);
  useFilterRedirect(filters, collection);

  const { postIndexPending, postIndex } = usePostIndex(collection, firebase);
  const filteredPosts = usePostFilter(postIndex, filters, collection);

  /**
   * Global ui state controlled drawer
   */
  const [uiState, uiDispatch] = useUIState();
  function toggleDrawer(open) {
    uiDispatch({ type: SET_DRAWER_OPEN, val: open });
  }
  function toggleFilter(open) {
    uiDispatch({ type: SET_FILTER_OPEN, val: open });
  }

  return (
    <>
      <LoadingOverlay type="linear" visible={postIndexPending} />

      <Fade in={!postIndexPending}>
        <div className="container-fluid p-0">
          {/* Global UI Elements */}
          <SwipeableDrawer
            open={uiState.showDrawer}
            toggleDrawer={toggleDrawer}
          >
            <SidebarManager
              toggleFilter={toggleFilter}
              pending={postIndexPending}
              filteredPosts={filteredPosts}
            />
          </SwipeableDrawer>

          <FilterManager
            posts={postIndex}
            isOpen={uiState.showFilterDialog}
            toggleFilter={toggleFilter}
          />

          {/* Visible Content */}
          <AppBar toggleDrawer={toggleDrawer} />
          <div style={{ paddingTop: appbarHeight }} />
          <ContentManager
            filteredPosts={filteredPosts}
            toggleFilter={toggleFilter}
          />
        </div>
      </Fade>
    </>
  );
}
export default withFirebase(Blog);
