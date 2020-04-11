import { useEffect } from "react";
import { urlDecodeStr } from "../../../util/url-util";

/**
 * Primary sort by date descending, secondary sort by title ascending
 */
export function getOrderedPosts(posts) {
  if (!posts) {
    return [];
  }

  // dates: YYYY-MM-DD format, allowing string comparison
  const sortOrder = (a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return a.title < b.title ? -1 : 1;
  };

  return posts.sort(sortOrder);
}

/**
 * Upon retrieval of new post
 * - update the document title with the post title
 * - scroll to top of page
 */
export function usePostEffects(postData, title) {
  useEffect(() => {
    if (postData && title) {
      document.title = urlDecodeStr(title);
      window.scrollTo(0, 0);
    }
  }, [postData, title]);
}
