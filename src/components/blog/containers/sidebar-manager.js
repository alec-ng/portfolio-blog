import React, { useState, useEffect } from "react";
import useUrlState from "../../../hooks/useUrlState";
import { trimFilters } from "../../../util/post-filter";

import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
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

  useEffect(() => {
    setChosenFilters(trimFilters(filters, collection));
  }, [filters, collection]);

  return (
    <div>
      <section className="mb-4">
        <NavLinkGroup currentCollection={collection} />
      </section>

      {pending ? (
        LoadingEle
      ) : (
        <section>
          <StyledSidebarButton
            type="button"
            onClick={openFilterDialog}
            active={Object.keys(filters).length > 0}
          >
            <TuneOutlinedIcon /> Filters
          </StyledSidebarButton>
          <FiltersDialog
            posts={posts}
            isOpen={filterDialogOpen}
            chosenFilters={chosenFilters}
            close={closeFilterDialog}
            setFilter={updateFilters}
          />
          <TreeManager posts={filteredPosts} />
        </section>
      )}
    </div>
  );
}

const LoadingEle = (
  <div className="text-center">
    <Spinner />
  </div>
);
