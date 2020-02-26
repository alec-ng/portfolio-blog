import { useEffect, useState } from "react";
import { VALID_COLLECTIONS, getIndexRef } from "./../util/constants";

/**
 * Given the name of a collection of posts, fetch the index root document from firebase
 * which contains all published posts of that collection
 */
export default function usePostIndex(collection, firebase) {
  const [postIndexPending, setPostIndexPending] = useState(true);
  const [postIndex, setPostIndex] = useState(null);

  useEffect(() => {
    if (!collection || VALID_COLLECTIONS.indexOf(collection) === -1) {
      return;
    }

    setPostIndexPending(true);
    getIndexRef(collection, firebase)
      .get()
      .then(doc => {
        setPostIndex(doc.data().index);
      })
      .catch(failure => {
        alert(
          `Sorry, something went wrong with fetching this collection. Please refresh and try again.`
        );
        console.error(failure);
        setPostIndex([]);
      })
      .finally(() => {
        setPostIndexPending(false);
      });
  }, [collection, firebase]);

  return { postIndexPending, postIndex };
}
