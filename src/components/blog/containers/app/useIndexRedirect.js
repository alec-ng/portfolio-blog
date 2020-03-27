import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getUrlState } from "../../../../hooks/useUrlState";
import {
  VALID_COLLECTIONS,
  COLLECTION_TRIPREPORTS,
  PATH_BLOG
} from "../../../../util/constants";

/**
 * If the collection specified by the url is not valid, redirect to the default collection
 */
export default function useIndexRedirect(collection) {
  const history = useHistory();
  const location = useLocation();
  const urlCollection = collection || getUrlState(location).collection;

  useEffect(() => {
    if (VALID_COLLECTIONS.indexOf(urlCollection) === -1) {
      history.replace(`${PATH_BLOG}/${COLLECTION_TRIPREPORTS}`);
    }
  }, [urlCollection, history]);
}
