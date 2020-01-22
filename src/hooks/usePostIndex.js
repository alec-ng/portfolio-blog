import React, { useEffect, useState } from "react";

export default function usePostIndex(collection, firebase) {
  const [postIndexPending, setPostIndexPending] = useState(true);
  const [postIndex, setPostIndex] = useState(null);
  const [postIndexError, setPostIndexError] = useState(null);

  useEffect(() => {
    let collectionToUse =
      !collection || VALID_COLLECTIONS.indexOf(collection)
        ? DEFAULT_COLLECTION
        : collection;

    setPostIndexPending(true);
    setPostIndexError(null);
    getIndexRef(collectionToUse, firebase)
      .get()
      .then(doc => {
        setPostIndex(doc.data().index);
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

const VALID_COLLECTIONS = ["photography", "tripreports"];

const DEFAULT_COLLECTION = "photography";
