import React, { useState, useEffect, useMemo } from "react";
import useFilters from "../../hooks/useFilters";
import { useParams, useHistory } from "react-router-dom";
import { trimFilters, filterPosts } from "../../util/post-filter";
import { constructViewPath } from "../../util/url-util";
import DialogContainer from "../universal/filter-dialog/filter-dialog";
import FilterForm from "../universal/filter-dialog/filter-form";

const queryString = require("query-string");

/**
 * Local state for filter dialog
 */
export default React.memo(FilterManager);

function FilterManager({
  publishedPosts,
  isOpen,
  toggleFilter,
  setFilteredPosts
}) {
  const urlFilters = useFilters();
  const [chosenFilters, setChosenFilters] = useState({});

  // Synchronize search params with set of chosen filters
  useEffect(() => {
    setChosenFilters(trimFilters(urlFilters));
  }, [urlFilters]);

  // memoize filtered subset of published posts, and update parent's copy
  const filteredPosts = useMemo(() => filterPosts(publishedPosts, urlFilters), [
    publishedPosts,
    urlFilters
  ]);
  useEffect(() => {
    setFilteredPosts(filteredPosts);
  }, [filteredPosts, setFilteredPosts]);

  // dialog handlers
  function updateFilters(changedFilters) {
    setChosenFilters(Object.assign({}, chosenFilters, changedFilters));
  }

  function onClose() {
    toggleFilter(false);
  }

  // navigate to same base url of current view with new location search string
  const { view } = useParams();
  const history = useHistory();

  function applyFilters() {
    let queryStrFilters = Object.assign({}, chosenFilters);
    for (let key in queryStrFilters) {
      if (!queryStrFilters[key]) {
        delete queryStrFilters[key];
      }
    }

    const queryStr = queryString.stringify(queryStrFilters);
    if (view === "map") {
      history.push(`/blog/map?${queryStr}`);
    } else {
      const newFilteredSubset = filterPosts(publishedPosts, queryStrFilters);
      const { date, title } = newFilteredSubset.reduce(mostRecentDateReduce);
      history.push(constructViewPath(date, title, `?${queryStr}`));
    }
    onClose();
  }

  return (
    <DialogContainer
      handleSave={applyFilters}
      handleClose={onClose}
      open={isOpen}
    >
      <FilterForm
        publishedPosts={publishedPosts}
        chosenValues={chosenFilters}
        onInputChange={updateFilters}
      />
    </DialogContainer>
  );
}

// ---------------- UTIL

const mostRecentDateReduce = (a, b) => {
  if (a.date > b.date) {
    return a;
  }
  if (a.date < b.date) {
    return b;
  }
  return a.title < b.title ? a : b;
};
