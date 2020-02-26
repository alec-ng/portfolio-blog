import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import usePrevious from "./usePrevious";
import { getKeyFromIndex, constructPath } from "./../util/url-util";

/**
 * Hook to decide whether or not the post specified by the URL is valid
 * If not, redirect to the latest (chronological) post in the current collection
 */
export default function usePostRedirect(posts, collection, postKey, filters) {
  const history = useHistory();
  const prevCollection = usePrevious(collection);
  const prevPosts = usePrevious(posts);

  const mostRecentDateReduce = (a, b) =>
    new Date(a.date) > new Date(b.date) ? a : b;

  useEffect(() => {
    // don't run if the user changed the collection or there's not enough post
    // info retrieved yet
    const postsExist = posts && posts.length;
    if (
      (!postsExist && !postKey) ||
      (prevCollection !== collection && prevCollection)
    ) {
      return;
    }

    //don't run if  filters changes but posts don't change as a result
    if (filters && prevPosts === posts) {
      return;
    }

    // if a set of posts and a post key exists, check if the postkey exists
    if (postsExist && postKey) {
      let chosenPost = posts.find(
        post => getKeyFromIndex(post).toUpperCase() === postKey.toUpperCase()
      );
      if (chosenPost) {
        return;
      }
    }

    // all other cases, once the posts load, redirect
    if (postsExist) {
      const { date, title } = posts.reduce(mostRecentDateReduce);
      history.replace(constructPath(collection, date, title, filters));
    }
  }, [posts, prevPosts, collection, prevCollection, postKey, filters, history]);
}
