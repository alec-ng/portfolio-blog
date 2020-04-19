import React, { useCallback, useState } from "react";
import usePublishedPosts from "./usePublishedPosts";
import useUIState, {
  SET_DRAWER_OPEN,
  SET_FILTER_OPEN
} from "../../../contexts/ui-context";

import Fade from "@material-ui/core/Fade";
import ViewRoutes from "../view-routes";
import SidebarManager from "../sidebar-manager";
import FilterManager from "../filter-manager";
import LoadingOverlay from "../../generic/loading-overlay";
import ViewRedirect from "../../universal/view-redirect";
import SwipeableDrawer from "../../universal/layout/swipable-drawer";
import AppBar, { appbarHeight } from "../../universal/layout/appbar";

/**
 * Top level container component for blog
 * - Layout
 * - Retrieves all published post metadata
 */
export default function Blog() {
  const { postsPending, publishedPosts } = usePublishedPosts();
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Global ui state controlled drawer
  const [uiState, uiDispatch] = useUIState();
  const toggleDrawer = useCallback(
    open => {
      uiDispatch({ type: SET_DRAWER_OPEN, val: open });
    },
    [uiDispatch]
  );
  const toggleFilter = useCallback(
    open => {
      uiDispatch({ type: SET_FILTER_OPEN, val: open });
    },
    [uiDispatch]
  );

  return (
    <>
      <ViewRedirect />
      <LoadingOverlay type="linear" visible={postsPending} />

      {!postsPending && (
        <Fade in={true}>
          <div className="container-fluid p-0">
            {/* Global UI Elements */}
            <SwipeableDrawer
              open={uiState.showDrawer}
              toggleDrawer={toggleDrawer}
            >
              <SidebarManager
                toggleFilter={toggleFilter}
                toggleDrawer={toggleDrawer}
                pending={postsPending}
                filteredPosts={filteredPosts}
              />
            </SwipeableDrawer>

            <FilterManager
              publishedPosts={publishedPosts}
              isOpen={uiState.showFilterDialog}
              toggleFilter={toggleFilter}
              setFilteredPosts={setFilteredPosts}
            />

            {/* Visible Content */}
            <AppBar toggleDrawer={toggleDrawer} />
            <div style={{ paddingTop: appbarHeight }} />
            <ViewRoutes
              filteredPosts={filteredPosts}
              toggleFilter={toggleFilter}
            />
          </div>
        </Fade>
      )}
    </>
  );
}
