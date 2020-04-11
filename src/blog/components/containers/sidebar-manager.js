import React from "react";
import useFilters from "../../hooks/useFilters";
import { useHistory, useLocation, useParams, Route } from "react-router-dom";
import { constructMapPath } from "../../util/url-util";

import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import TreeManager from "./tree-manager";
import Spinner from "../generic/spinner";
import { StyledSidebarButton } from "../universal/layout/styled-sidebar-elements";

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

  function navigateToMapView() {
    if (view !== "map") {
      history.push(constructMapPath(location));
      toggleDrawer(false);
    }
  }
  function openFilterDialog() {
    toggleFilter(true);
  }
  function closeDrawer() {
    toggleDrawer(false);
  }

  return (
    <div>
      {pending ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mb-3">
            <StyledSidebarButton
              type="button"
              onClick={navigateToMapView}
              active={view === "map"}
            >
              <MapOutlinedIcon /> Map
            </StyledSidebarButton>
            <StyledSidebarButton
              type="button"
              onClick={openFilterDialog}
              active={Object.keys(filters).length > 0}
            >
              <TuneOutlinedIcon /> Filters
            </StyledSidebarButton>
          </div>
          <div className="mb-3">
            <Route path={["/blog/:view/:date/:title", "/blog/:view"]}>
              <TreeManager posts={filteredPosts} closeDrawer={closeDrawer} />
            </Route>
          </div>
        </>
      )}
    </div>
  );
}
