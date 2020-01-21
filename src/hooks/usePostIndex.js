import React, { useEffect, useState } from "react";

export default function usePostIndex(collection, firebase) {
  const [postIndexPending, setPostIndexPending] = useState(true);
  const [postIndex, setPostIndex] = useState(null);
  const [postIndexError, setPostIndexError] = useState(null);

  useEffect(() => {
    if (!collection) {
      return;
    }
    getIndexRef(collection, firebase)
      .get()
      .then(doc => {
        setPostIndex(doc.data());
        setPostIndexError(null);
      })
      .catch(failure => {
        setPostIndexError(failure);
        setPostIndex(null);
      })
      .finally(() => {
        setPostIndexPending(false);
      });
  }, [collection]);

  return { postIndexPending, postIndex, postIndexError };
}

function getIndexRef(collection, firebase) {
  const collectionMap = {
    photography: firebase.photographyIndex(),
    tripreport: firebase.tripreportIndex()
  };
  return collectionMap[collection];
}
