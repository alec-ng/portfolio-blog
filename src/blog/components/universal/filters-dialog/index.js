import React from "react";
import { useHistory } from "react-router-dom";
import DialogContainer from "./dialog-container";
import TripReportForm from "../filter-forms/trip-reports";
import { useUrlView } from "../../../hooks";

import { VIEW_PATHS, APP_VIEW } from "../../../util/constants";
const queryString = require("query-string");

/**
 * Renders a filter form nested in a dialog
 */
export default function FiltersDialog({
  posts,
  isOpen,
  chosenFilters,
  close,
  setFilter
}) {
  /**
   * Takes the chosen filters, serializes them to a query str, and navigates
   * to root trip report
   */
  const history = useHistory();
  const view = useUrlView();

  /**
   * stringifies the key value pairing of filters and pushes a new history state
   */
  function applyFilters() {
    const queryStrFilters = Object.assign({}, chosenFilters);
    for (let key in queryStrFilters) {
      if (queryStrFilters[key] === null || queryStrFilters[key] === undefined) {
        delete queryStrFilters[key];
      }
    }

    const queryStr = queryString.stringify(queryStrFilters);
    const newUrl =
      view === APP_VIEW.map
        ? `${VIEW_PATHS.map}?${queryStr}`
        : `${VIEW_PATHS.post}?${queryStr}`;
    history.push(newUrl);
    close();
  }

  return (
    <>
      <DialogContainer
        handleSave={applyFilters}
        handleClose={close}
        open={isOpen}
      >
        <TripReportForm
          posts={posts}
          chosenValues={chosenFilters}
          onInputChange={setFilter}
        />
      </DialogContainer>
    </>
  );
}
