import React from "react";
import { useHistory } from "react-router-dom";
import useUrlState from "../../hooks/useUrlState";
import useUrlView from "../../hooks/useUrlView";
import { APP_VIEW } from "../../util/constants";
import { constructMapPath } from "../../util/url-util";

import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import TreeManager from "./tree-manager";
import NavLinkGroup from "../universal/nav-link-group";
import Spinner from "../generic/spinner";
import { StyledSidebarButton } from "../universal/styled-sidebar-elements";

/**
 * Top level container for all sidebar related components
 */
export default function SidebarManager({
  toggleFilter,
  filteredPosts,
  pending
}) {
  const { collection, filters } = useUrlState();
  const view = useUrlView();
  const history = useHistory();

  function navigateToMapView() {
    if (view !== APP_VIEW.map) {
      history.push(constructMapPath(filters));
    }
  }
  function openFilterDialog() {
    toggleFilter(true);
  }

  return (
    <div>
      <div className="mb-3">
        <NavLinkGroup currentCollection={collection} />
      </div>

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
              active={view === APP_VIEW.map}
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
            <TreeManager posts={filteredPosts} />
          </div>
        </>
      )}
    </div>
  );
}
