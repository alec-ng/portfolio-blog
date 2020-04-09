import { useEffect, useState } from "react";
import { VALID_COLLECTIONS, getIndexRef } from "../../../util/constants";

/**
 * Given the name of a collection of posts, fetch the index root document from firebase
 * which contains all published posts of that collection
 */
export default function usePublishedPosts(collection, firebase) {
  const [postsPending, setPostsPending] = useState(true);
  const [publishedPosts, setPublishedPosts] = useState(null);

  useEffect(() => {
    setPublishedPosts([]);
    if (!collection || VALID_COLLECTIONS.indexOf(collection) === -1) {
      return;
    }

    setPostsPending(true);
    getIndexRef(collection, firebase)
      .get()
      .then(doc => {
        setPublishedPosts(doc.data().index);
      })
      .catch(failure => {
        alert(
          `Sorry, something went wrong with fetching this collection. Please refresh and try again.`
        );
        console.error(failure);
      })
      .finally(() => {
        setPostsPending(false);
      });
  }, [collection, firebase]);

  return { postsPending, publishedPosts };
}
