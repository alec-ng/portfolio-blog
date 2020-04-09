import React, { useMemo } from "react";
import useFirebase from "../../../contexts/firebase";
import useUrlState from "../../../hooks/useUrlState";
import usePublishedPosts from "./usePublishedPosts";
import useFilterRedirect from "./useFilterRedirect";
import useIndexRedirect from "./useIndexRedirect";
import { filterPosts } from "../../../util/post-filter";
import useUIState, {
  SET_DRAWER_OPEN,
  SET_FILTER_OPEN
} from "../../../contexts/ui-context";

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
export default function Blog() {
  /**
   * Synchronize filters and published collection data
   * Validate and redirect if needed
   */
  const { collection, filters } = useUrlState();
  const firebase = useFirebase();
  useIndexRedirect(collection);
  useFilterRedirect(filters, collection);

  const { postsPending, publishedPosts } = usePublishedPosts(
    collection,
    firebase
  );
  const filteredPosts = useMemo(
    () => filterPosts(publishedPosts, filters, collection),
    [publishedPosts, filters, collection]
  );

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
      <LoadingOverlay type="linear" visible={postsPending} />

      <Fade in={!postsPending}>
        <div className="container-fluid p-0">
          {/* Global UI Elements */}
          <SwipeableDrawer
            open={uiState.showDrawer}
            toggleDrawer={toggleDrawer}
          >
            <SidebarManager
              toggleFilter={toggleFilter}
              pending={postsPending}
              filteredPosts={filteredPosts}
            />
          </SwipeableDrawer>

          <FilterManager
            posts={publishedPosts}
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
