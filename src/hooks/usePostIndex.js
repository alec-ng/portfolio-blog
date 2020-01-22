import { useEffect, useState } from "react";
import { VALID_COLLECTIONS } from "./../util/constants";

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
        setPostIndex(null);
      })
      .finally(() => {
        setPostIndexPending(false);
      });
  }, [collection]);

  return { postIndexPending, postIndex };
}

function getIndexRef(collection, firebase) {
  const collectionMap = {
    photography: firebase.photographyIndex(),
    tripreports: firebase.tripreportIndex()
  };
  return collectionMap[collection];
}
