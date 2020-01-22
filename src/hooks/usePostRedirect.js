import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getUrlState } from "./useUrlState";
import { getKeyFromIndex } from "./../util/url-util";
import { PATH_BLOG } from "./../util/constants";

/**
 * Given the current collection to show, decide whether or not the post specified
 * by the URL is valid. If not, redirect to the latest (chronological) post in the
 * current collection
 */
export default function useIndexRedirect(postIndex) {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!postIndex) {
      return;
    }
    const { urlCollection, urlKey } = getUrlState(location.pathname);

    let chosenPost;
    if (urlKey) {
      chosenPost = postIndex.find(
        post => getKeyFromIndex(post).toUpperCase() === urlKey.toUpperCase()
      );
    }

    // if it doesn't exist, update to be latest available post
    if (!urlKey || !chosenPost) {
      function dateReduce(a, b) {
        return new Date(a.date) > new Date(b.date) ? a : b;
      }
      let mostRecentPost = postIndex.reduce(dateReduce);
      let title = mostRecentPost.title.trim().replace(/ /g, "-");
      history.replace(
        `${PATH_BLOG}/${urlCollection}/${mostRecentPost.date}/${title}`
      );
    }
  }, [postIndex]);
}
