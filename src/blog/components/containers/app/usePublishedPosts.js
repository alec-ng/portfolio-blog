import { useEffect, useState } from "react";
import useFirebase from "../../../contexts/firebase";

/**
 * Given the name of a collection of posts, fetch the index root document from firebase
 * which contains all published posts of that collection
 */
export default function usePublishedPosts() {
  const [postsPending, setPostsPending] = useState(true);
  const [publishedPosts, setPublishedPosts] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    setPublishedPosts([]);
    setPostsPending(true);

    firebase
      .publishedPostsMetadata()
      .get()
      .then(doc => {
        setPublishedPosts(doc.data().index);
      })
      .catch(failure => {
        alert(`Sorry, something went wrong! Please refresh and try again.`);
        console.error(failure);
      })
      .finally(() => {
        setPostsPending(false);
      });
  }, [firebase]);

  return { postsPending, publishedPosts };
}
