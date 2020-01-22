import { useEffect, useState } from "react";
import useUrlState from "./useUrlState";
import { getKeyFromIndex } from "./../util/url-util";

export default function usePostData(firebase, postIndex) {
  const [postDataPending, setPending] = useState(false);
  const [postData, setPostData] = useState(null);
  const { postKey } = useUrlState();

  useEffect(() => {
    // Determine whether there is a post in the URL, and if it's valid in the current collection
    if (!postKey || !postIndex) {
      return;
    }
    debugger;
    let chosenPost = postIndex.find(
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
  }, [postKey, postIndex]);

  return { postData, postDataPending };
}
