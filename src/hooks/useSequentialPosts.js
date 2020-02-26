import { useState, useEffect } from "react";
import { createTreeData } from "../components/blog/generic/rc-tree/util";
import { getKeyFromIndex } from "../util/url-util";

/**
 * Hook to determine the next/previous post relative to the current selectd post
 */
export default function useSequentialPosts(postKey, postIndex) {
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    if (!postKey || !postIndex) {
      return;
    }
    // find the unique of the selected post
    const publishedPost = postIndex.find(
      post => getKeyFromIndex(post).toUpperCase() === postKey.toUpperCase()
    );
    if (!publishedPost) {
      return;
    }

    // find index of selected post in the sequential ordering of all posts
    const sequentialTreeData = createTreeData(postIndex).sequentialData;
    const currPostIndex = sequentialTreeData.findIndex(
      post => publishedPost.postDataId === post.key
    );

    let prevPostIndex =
      currPostIndex !== 0 ? currPostIndex - 1 : sequentialTreeData.length - 1;
    setPrevPost(sequentialTreeData[prevPostIndex]);

    let nextPostIndex =
      currPostIndex !== sequentialTreeData.length - 1 ? currPostIndex + 1 : 0;
    setNextPost(sequentialTreeData[nextPostIndex]);
  }, [postKey, postIndex]);

  return [prevPost, nextPost];
}
