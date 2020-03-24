import React from "react";
import { useHistory } from "react-router-dom";
import DialogContainer from "./dialog-container";
import TripReportForm from "../filter-forms/trip-reports";

import { VIEW_PATHS } from "../../../../util/constants";
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

  function applyFilters() {
    const queryStrFilters = Object.assign({}, chosenFilters);
    for (let key in queryStrFilters) {
      if (queryStrFilters[key] === null || queryStrFilters[key] === undefined) {
        delete queryStrFilters[key];
      }
    }
    const queryStr = queryString.stringify(queryStrFilters);
    history.push(`${VIEW_PATHS.post}?${queryStr}`);
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
