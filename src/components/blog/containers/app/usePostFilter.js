import { useEffect, useState } from "react";
import { filterPosts } from "../../../../util/post-filter";
import { urlDecodeStr } from "../../../../util/url-util";

/**
 * Return subset of posts depending on filters specified in URL as well as collection
 * being shown
 */
export default function usePostFilter(posts, chosenFilters, collection) {
  const [filteredPosts, setFilteredPosts] = useState(null);

  useEffect(() => {
    if (posts) {
      let filtersToApply = Object.assign({}, chosenFilters);
      for (let key in filtersToApply) {
        filtersToApply[key] = urlDecodeStr(filtersToApply[key]);
      }
      setFilteredPosts(filterPosts(posts, filtersToApply, collection));
    }
  }, [posts, chosenFilters, collection]);

  return filteredPosts;
}
