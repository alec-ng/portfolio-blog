import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getUrlState } from "./useUrlState";
import {
  VALID_COLLECTIONS,
  COLLECTION_PHOTOGRAPHY,
  PATH_BLOG
} from "./../util/constants";

export default function useIndexRedirect() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const { urlCollection } = getUrlState(location.pathname);
    if (VALID_COLLECTIONS.indexOf(urlCollection) === -1) {
      history.replace(`${PATH_BLOG}/${COLLECTION_PHOTOGRAPHY}`);
    }
  }, []);
}
