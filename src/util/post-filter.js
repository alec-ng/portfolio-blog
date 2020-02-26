import { COLLECTION_TRIPREPORTS, COLLECTION_TRAVELS } from "./constants";

export const tripReportFilters = ["area", "region"];
export const travelFilters = [];
export const collectionToDependenciesMap = {
  [COLLECTION_TRIPREPORTS]: {
    area: ["region"]
  }
};
export const collectionToFiltersMap = {
  [COLLECTION_TRIPREPORTS]: tripReportFilters,
  [COLLECTION_TRAVELS]: travelFilters
};

/**
 * Given a list of posts, the current filters specified by the url state, and the
 * collection being shown, return a subset of posts that match the filter criteria
 */
export function filterPosts(posts, filterMap, collection) {
  if (!Object.keys(filterMap).length || !collection || !posts) {
    return posts;
  }

  // get minimal subset of filters relevant for the collection
  const trimmedFilters = trimFilters(filterMap, collection);
  switch (collection) {
    case COLLECTION_TRIPREPORTS:
      return filterTripReports(posts, trimmedFilters);
    default:
      return posts;
  }
}

/**
 * Given an object of filters from useUrlState(), return back the minimal set of keys relevant
 * to the specified collection
 */
export function trimFilters(filterMap, collection) {
  const filtersForCollection = collectionToFiltersMap[collection];
  if (!filterMap || !filtersForCollection) {
    return {};
  }
  let trimmedFilters = Object.assign({}, filterMap);
  Object.keys(trimmedFilters).forEach(filter => {
    if (!filterMap[filter] || filtersForCollection.indexOf(filter) === -1) {
      delete trimmedFilters.filter;
    }
  });
  return trimmedFilters;
}

/**
 * Look for single match comparisons in each collection field
 * e.g. x === y
 */
function filterTripReports(posts, chosenFilters) {
  let subset = [];
  for (let post of posts) {
    const reducer = (isValid, currFilter) => {
      if (!post[currFilter]) return false;
      const postFilterValue = post[currFilter].trim().toUpperCase();
      const expectedFilterValue = chosenFilters[currFilter]
        .trim()
        .toUpperCase();
      return isValid && postFilterValue === expectedFilterValue;
    };
    const isValid = Object.keys(chosenFilters).reduce(reducer, true);
    if (isValid) {
      subset.push(post);
    }
  }
  return subset;
}
