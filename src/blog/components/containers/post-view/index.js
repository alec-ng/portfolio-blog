import React, { useMemo } from "react";
import { withFirebase } from "../../../hoc/firebase";
import { useHistory } from "react-router-dom";
import useUrlState from "../../../hooks/useUrlState";
import usePostData from "./usePostData";
import usePostRedirect from "./usePostRedirect";

import { getOrderedPosts, usePostEffects, EmptyPostView } from "./util";

import { getPostMappings } from "../../../util/post-util";
import { constructPath } from "../../../util/url-util";

import Editor from "../../universal/editor";
import FancyHr from "../../universal/blog-post-hr";
import EndContentNavigator from "../../universal/end-content-navigator";
import LoadingOverlay from "../../generic/loading-overlay";

/**
 * Container for showing a specific post
 */
function PostView({ filteredPosts, firebase }) {
  /**
   * Redirect if the URL doesn't refer to a valid post for the current filtered collection
   */
  const { postKey, collection, postTitle, filters } = useUrlState();
  usePostRedirect(filteredPosts, collection, postKey, filters);

  /**
   * Fetch post data and determine what to render
   */
  const { postData, postDataPending } = usePostData(
    firebase,
    filteredPosts,
    postKey
  );
  usePostEffects(postData, postTitle);

  /**
   * Determine data to render
   */
  const { keyToPostMap } = useMemo(() => getPostMappings(filteredPosts), [
    filteredPosts
  ]);

  const [prevPost, nextPost] = useMemo(
    () => getOrderedPosts(postKey, filteredPosts),
    [postKey, filteredPosts]
  );

  const postMetadata =
    postKey && keyToPostMap ? keyToPostMap[postKey.toUpperCase()] : null;

  const postsDoNotExist =
    !postData && !postDataPending && (!filteredPosts || !filteredPosts.length);

  /**
   * On prev/next post click, initiate URL change
   */
  const history = useHistory();

  function onNavigationPostClick(e) {
    const newPostTreedata =
      e.currentTarget.dataset.direction === "previous" ? prevPost : nextPost;

    const newPost = filteredPosts.find(
      post => post.postDataId === newPostTreedata.key
    );

    const newUrl = constructPath(
      collection,
      newPost.date,
      newPost.title,
      filters
    );

    history.push(newUrl);
  }

  return (
    <>
      <LoadingOverlay type="circular" visible={postDataPending} />

      {postData && postMetadata && (
        <div id="global-editor-container" className="mb-5">
          <Editor pageData={postData} postMetadata={postMetadata} />
          <FancyHr collection={collection} />
          <EndContentNavigator
            onButtonClick={onNavigationPostClick}
            prevPost={prevPost}
            nextPost={nextPost}
          />
        </div>
      )}

      {postsDoNotExist && <EmptyPostView />}
    </>
  );
}
export default withFirebase(PostView);
