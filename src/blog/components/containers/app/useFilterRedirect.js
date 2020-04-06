import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useUrlView from "../../../hooks/useUrlView";
import { APP_VIEW } from "../../../util/constants";
import { constructPath, constructMapPath } from "../../../util/url-util";
import {
  collectionToDependenciesMap,
  collectionToFiltersMap
} from "../../../util/post-filter";

/**
 * Initiates a redirect if the url parameters provided do not correspond to valid filters
 */
export default function useFilterRedirect(filters, collection) {
  const history = useHistory();
  const view = useUrlView();

  useEffect(() => {
    const notLoaded = !collection;
    const noFilters = !filters || !Object.keys(filters).length;
    if (notLoaded || noFilters) {
      return;
    }

    // Check: (1) does it have a value?
    // (2) is it valid for the current collection?
    // (3) if it has any dependencies, are they satisfied?
    const validFilters = collectionToFiltersMap[collection];
    const dependencyMap = collectionToDependenciesMap[collection];
    let validSubset = Object.assign({}, filters);

    for (let filter in validSubset) {
      if (!validSubset[filter] || validFilters.indexOf(filter) === -1) {
        // (1),(2)
        delete validSubset[filter];
        continue;
      }

      if (dependencyMap[filter]) {
        // (3)
        const reducer = (isValid, depFilter) =>
          isValid && validSubset[depFilter];
        let areDepsMet = dependencyMap[filter].reduce(reducer, true);
        if (!areDepsMet) {
          delete validSubset[filter];
        }
      }
    }

    // if the valid subset is less than the original, do redirect using all valid filters
    if (Object.keys(validSubset).length !== Object.keys(filters).length) {
      const newPath =
        view === APP_VIEW.map
          ? constructMapPath(validSubset)
          : constructPath(collection, null, null, validSubset);
      history.replace(newPath);
    }
  }, [filters, collection, history, view]);
}
