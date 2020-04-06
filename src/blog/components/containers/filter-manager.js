import React, { useState, useEffect } from "react";
import useUrlState from "../../hooks/useUrlState";
import { trimFilters } from "../../util/post-filter";
import FiltersDialog from "../universal/filters-dialog/index";

/**
 * Local state for filter dialog
 */
export default function FilterManager({ posts, isOpen, toggleFilter }) {
  const { collection, filters } = useUrlState();
  const [chosenFilters, setChosenFilters] = useState({});

  /**
   * Synchronize applied filters stored in URL
   */
  useEffect(() => {
    setChosenFilters(trimFilters(filters, collection));
  }, [filters, collection]);

  function updateFilters(changedFilters) {
    setChosenFilters(Object.assign({}, chosenFilters, changedFilters));
  }
  function onClose() {
    toggleFilter(false);
  }

  return (
    <FiltersDialog
      posts={posts}
      isOpen={isOpen}
      chosenFilters={chosenFilters}
      close={onClose}
      setFilter={updateFilters}
    />
  );
}
