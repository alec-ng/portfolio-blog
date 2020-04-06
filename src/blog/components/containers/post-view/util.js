import React, { useEffect } from "react";
import { createTreeData } from "../../generic/rc-tree/util";
import { getKeyFromIndex } from "../../../util/url-util";

/**
 * Given a slug, determines the "next" and "previous" post in chronological order
 * and returns their post metadata
 * Returns [prevPost, nextPost]
 */
export function getOrderedPosts(slug, posts) {
  if (!slug || !posts) {
    return [null, null];
  }
  // find the unique of the selected post
  const selectedPost = posts.find(
    post => getKeyFromIndex(post).toUpperCase() === slug.toUpperCase()
  );
  if (!selectedPost) {
    return [null, null];
  }

  // find index of selected post in the sequential ordering of all posts
  const sequentialTreeData = createTreeData(posts).sequentialData;
  const currPostIndex = sequentialTreeData.findIndex(
    post => selectedPost.postDataId === post.key
  );

  const prevPostIndex =
    currPostIndex !== 0 ? currPostIndex - 1 : sequentialTreeData.length - 1;
  const nextPostIndex =
    currPostIndex !== sequentialTreeData.length - 1 ? currPostIndex + 1 : 0;

  return [sequentialTreeData[prevPostIndex], sequentialTreeData[nextPostIndex]];
}

/**
 * Upon retrieval of new post
 * - update the document title with the post title
 * - scroll to top of page
 */
export function usePostEffects(postData, postTitle) {
  useEffect(() => {
    if (postData && postTitle) {
      document.title = postTitle;
      window.scrollTo(0, 0);
    }
  }, [postData, postTitle]);
}

// ---------- MARKUP

export const EmptyPostView = () => (
  <div className="text-center my-5 mx-3">
    <h1>There's nothing to see here!</h1>
    <h3>Try adjusting the filters in the sidebar to be less restrictive.</h3>
  </div>
);
