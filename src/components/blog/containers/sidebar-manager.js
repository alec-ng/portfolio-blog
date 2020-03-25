import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useUrlState from "../../../hooks/useUrlState";
import useUrlView from "../../../hooks/useUrlView";
import { trimFilters } from "../../../util/post-filter";
import { VIEW_PATHS, APP_VIEW } from "../../../util/constants";

import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import TreeManager from "./tree-manager";
import NavLinkGroup from "../universal/nav-link-group";
import FiltersDialog from "../universal/filters-dialog/index";
import Spinner from "../generic/spinner";
import { StyledSidebarButton } from "../universal/styled-sidebar-elements";

/**
 * Top level container for all sidebar related components
 */
export default function SidebarManager({ posts, filteredPosts, pending }) {
  /**
   * Controlled filter dialog state
   */
  const { collection, filters } = useUrlState();
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [chosenFilters, setChosenFilters] = useState({});

  function openFilterDialog() {
    setFilterDialogOpen(true);
  }
  function closeFilterDialog() {
    setFilterDialogOpen(false);
  }
  function updateFilters(changedFilters) {
    setChosenFilters(Object.assign({}, chosenFilters, changedFilters));
  }

  /**
   * Synchronize applied filters stored in URL
   */
  useEffect(() => {
    setChosenFilters(trimFilters(filters, collection));
  }, [filters, collection]);

  /**
   * Switch to map view
   */
  const view = useUrlView();
  const history = useHistory();

  function navigateToMapView() {
    if (view !== APP_VIEW.map) {
      history.push(VIEW_PATHS.map);
    }
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

          <FiltersDialog
            posts={posts}
            isOpen={filterDialogOpen}
            chosenFilters={chosenFilters}
            close={closeFilterDialog}
            setFilter={updateFilters}
          />
        </>
      )}
    </div>
  );
}
