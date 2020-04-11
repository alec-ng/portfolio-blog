import React from "react";
import useFilters from "../../hooks/useFilters";
import { useHistory, useLocation, useParams, Route } from "react-router-dom";
import { constructMapPath } from "../../util/url-util";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import EmojiPeopleOutlinedIcon from "@material-ui/icons/EmojiPeopleOutlined";
import TreeManager from "./tree-manager";
import Spinner from "../generic/spinner";
import {
  Divider,
  PrimaryNavButton
} from "../universal/layout/styled-sidebar-elements";

/**
 * Top level container for all sidebar related components
 */
export default React.memo(SidebarManager);

function SidebarManager({
  toggleFilter,
  toggleDrawer,
  filteredPosts,
  pending
}) {
  const filters = useFilters();
  const { view } = useParams();
  const history = useHistory();
  const location = useLocation();

  // Button click handleres
  function navigateToMapView() {
    if (view !== "map") {
      history.push(constructMapPath(location));
      toggleDrawer(false);
    }
  }

  function navigateToHome() {
    history.push("/");
  }

  function openFilterDialog() {
    toggleFilter(true);
  }

  function closeDrawer() {
    toggleDrawer(false);
  }

  return (
    <>
      {pending ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <PrimaryNavButton type="button" onClick={navigateToHome}>
            <EmojiPeopleOutlinedIcon /> About
          </PrimaryNavButton>
          <PrimaryNavButton
            type="button"
            onClick={navigateToMapView}
            active={view === "map"}
          >
            <MapOutlinedIcon /> Map
          </PrimaryNavButton>
          <PrimaryNavButton
            type="button"
            onClick={openFilterDialog}
            active={Object.keys(filters).length > 0}
          >
            <SearchOutlinedIcon /> Search
          </PrimaryNavButton>

          <Divider />

          <Route path={["/blog/:view/:date/:title", "/blog/:view"]}>
            <TreeManager posts={filteredPosts} closeDrawer={closeDrawer} />
          </Route>
        </div>
      )}
    </>
  );
}
