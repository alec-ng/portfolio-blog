import { useEffect, useState } from "react";
import { getSlugFromPublishedPost } from "../../../util/url-util";

/**
 * Given the current collection of posts and a key of a specific post to show,
 * fetches the post from Firebase
 */
export default function usePostData(firebase, publishedPosts, slug) {
  const [postDataPending, setPending] = useState(false);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    setPostData(null);

    // No need for callout if post doesn't exist
    if (!slug || !publishedPosts) {
      return;
    }
    const chosenPost = publishedPosts.find(
      post =>
        getSlugFromPublishedPost(post).toUpperCase() === slug.toUpperCase()
    );
    if (!chosenPost) {
      return;
    }

    setPending(true);
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
  }, [slug, publishedPosts, firebase]);

  return { postData, postDataPending };
}
