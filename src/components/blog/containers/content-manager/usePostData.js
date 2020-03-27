import { useEffect, useState } from "react";
import { getKeyFromIndex } from "../../../../util/url-util";
import { PATH_BLOG } from "../../../../util/constants";

/**
 * Given the current collection of posts and a key of a specific post to show,
 * fetches the post from Firebase
 */
export default function usePostData(firebase, postIndex, postKey) {
  const [postDataPending, setPending] = useState(false);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    // Determine whether there is a post in the URL, and if it's valid in the current collection
    if (!postKey || !postIndex) {
      return;
    }

    const chosenPost = postIndex.find(
      post => getKeyFromIndex(post).toUpperCase() === postKey.toUpperCase()
    );
    if (!chosenPost) {
      return;
    }

    setPending(true);
    setPostData(null);
    firebase
      .singlePostData(chosenPost.postDataId)
      .get()
      .then(doc => {
        setPostData(doc.data());
      })
      .catch(failure => {
        alert(
          `Sorry, something went wrong with fetching this post. Please refresh and try again.`
        );
        console.error(failure);
        setPostData(null);
      })
      .finally(() => {
        setPending(false);
      });
  }, [postKey, postIndex, firebase]);

  return { postData, postDataPending };
}
