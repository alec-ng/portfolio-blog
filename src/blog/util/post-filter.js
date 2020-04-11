import { urlDecodeStr } from "./url-util";

const VALID_FILTERS = ["area", "region"];

/**
 * Return a subset of posts that match only the valid filters provided
 */
export function filterPosts(posts, filters) {
  if (!Object.keys(filters).length || !posts) {
    return posts;
  }

  const filterMap = Object.keys(filters).reduce(
    (curr, filter) =>
      Object.assign({}, curr, {
        [filter]: urlDecodeStr(filters[filter])
      }),
    {}
  );

  const trimmedFilters = trimFilters(filterMap);
  return filterTripReports(posts, trimmedFilters);
}

/**
 * Validates the input set of filters and returns back a subset
 * only containing valid, non null entries
 */
export function trimFilters(filterMap) {
  if (!filterMap) {
    return {};
  }
  let trimmedFilters = Object.assign({}, filterMap);
  Object.keys(trimmedFilters).forEach(filter => {
    if (!filterMap[filter] || VALID_FILTERS.indexOf(filter) === -1) {
      delete trimmedFilters.filter;
    }
  });
  return trimmedFilters;
}

/**
 * Filters posts by using a simple, case-insensitive, trimmed
 * comparison on each filter
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
