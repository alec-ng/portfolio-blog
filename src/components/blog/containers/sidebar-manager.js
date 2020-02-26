import React, { useState, useEffect } from "react";
import useUrlState from "../../../hooks/useUrlState";
import { useHistory } from "react-router-dom";

import TreeManager from "./tree-manager";
import NavLinkGroup from "../universal/nav-link-group";
import FiltersDialog from "../universal/filters-dialog";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import HikingFilterForm from "../universal/hiking-filter-form";
import Spinner from "../generic/spinner";
import { StyledSidebarButton } from "../universal/styled-sidebar-elements";

import { PATH_BLOG } from "../../../util/constants";
import { trimFilters } from "../../../util/post-filter";

const queryString = require("query-string");

/**
 * Container component for all sidebar components
 */
export default function SidebarManager({ posts, filteredPosts, pending }) {
  const history = useHistory();
  const { collection, filters } = useUrlState();
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [chosenFilters, setChosenFilters] = useState({});

  /**
   * synchronize filters specified in URL with local state value
   */
  useEffect(() => {
    setChosenFilters(trimFilters(filters, collection));
  }, [filters, collection]);

  /**
   * Helpers for toggling dialog visibility
   */
  function openFilterDialog() {
    setFilterDialogOpen(true);
  }
  function closeFilterDialog() {
    setFilterDialogOpen(false);
  }

  /**
   * Replaces the URL with query strings corresponding to chosen filterse
   */
  function applyFilters(e) {
    const queryStrFilters = Object.assign({}, chosenFilters);
    for (let key in queryStrFilters) {
      if (queryStrFilters[key] === null || queryStrFilters[key] === undefined) {
        delete queryStrFilters[key];
      }
    }
    const queryStr = queryString.stringify(queryStrFilters);
    history.replace(`${PATH_BLOG}/${collection}?${queryStr}`);
    closeFilterDialog();
  }

  /**
   * On filter change by user, update local state with chosen value
   */
  function setLocalFilter(changedFilters) {
    setChosenFilters(Object.assign({}, chosenFilters, changedFilters));
  }

  return (
    <div>
      <section className="mb-4">
        <NavLinkGroup currentCollection={collection} />
      </section>

      {pending ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <>
          <StyledSidebarButton
            type="button"
            onClick={openFilterDialog}
            active={Object.keys(filters).length > 0}
          >
            <TuneOutlinedIcon /> Filters
          </StyledSidebarButton>

          <FiltersDialog
            handleSave={applyFilters}
            handleClose={closeFilterDialog}
            open={filterDialogOpen}
          >
            <HikingFilterForm
              posts={posts}
              selected={chosenFilters}
              onInputChange={setLocalFilter}
            />
          </FiltersDialog>
          <TreeManager posts={filteredPosts} />
        </>
      )}
    </div>
  );
}
