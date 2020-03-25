import React, { useEffect } from "react";
import { withFirebase } from "../../../../hoc/firebase";
import { useHistory } from "react-router-dom";
import useUrlState from "../../../../hooks/useUrlState";
import useTransformedIndexData from "../../../../hooks/useTransformedIndexData";
import usePostData from "./usePostData";
import usePostRedirect from "./usePostRedirect";
import useSequentialPosts from "./useSequentialPosts";

import { constructPath } from "../../../../util/url-util";

import Editor from "../../universal/editor";
import FancyHr from "../../universal/blog-post-hr";
import EndContentNavigator from "../../universal/end-content-navigator";
import LoadingOverlay from "../../generic/loading-overlay";

/**
 * Container for content concerning the current post
 */
function PostView({ filteredPosts, firebase }) {
  /**
   * Redirect if the URL doesn't refer to a valid post for the current filtered collection
   */
  const { postKey, collection, postTitle, filters } = useUrlState();
  usePostRedirect(filteredPosts, collection, postKey, filters);

  /**
   * Hooks to provide post data
   */
  const [prevPost, nextPost] = useSequentialPosts(postKey, filteredPosts);
  const { postData, postDataPending } = usePostData(
    firebase,
    filteredPosts,
    postKey
  );
  const { keyToPostMap } = useTransformedIndexData(filteredPosts);
  const postMetadata =
    postKey && keyToPostMap ? keyToPostMap[postKey.toUpperCase()] : null;
  const postsDoNotExist =
    !postData && !postDataPending && (!filteredPosts || !filteredPosts.length);

  /**
   * Synchronize document title with post being shown
   */
  useEffect(() => {
    if (postData && postTitle) {
      document.title = postTitle;
    }
  }, [postData, postTitle]);

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

const EmptyPostView = () => (
  <div className="text-center my-5 mx-3">
    <h1>There's nothing to see here!</h1>
    <h3>Try adjusting the filters in the sidebar to be less restrictive.</h3>
  </div>
);
