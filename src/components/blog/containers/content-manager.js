import React, { useEffect } from "react";
import { withFirebase } from "../../../hoc/firebase";
import { useHistory } from "react-router-dom";
import useUrlState from "../../../hooks/useUrlState";
import usePostData from "../../../hooks/usePostData";
import usePostRedirect from "../../../hooks/usePostRedirect";
import useSequentialPosts from "../../../hooks/useSequentialPosts";
import { constructPath } from "../../../util/url-util";

import Editor from "../universal/editor";
import FancyHr from "../universal/blog-post-hr";
import EndContentNavigator from "../universal/end-content-navigator";
import LoadingOverlay from "../generic/loading-overlay";

/**
 * Container for content concerning the current post
 */
function ContentManager({ posts, firebase }) {
  // Redirect if the URL state does not point to a valid post for the current filtered collection
  const { postKey, collection, postTitle, filters } = useUrlState();
  usePostRedirect(posts, collection, postKey, filters);

  const history = useHistory();
  const [prevPost, nextPost] = useSequentialPosts(postKey, posts);
  const { postData, postDataPending } = usePostData(firebase, posts, postKey);

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
  function onNavigationPostClick(e) {
    const newPostTreedata =
      e.currentTarget.dataset.direction === "previous" ? prevPost : nextPost;
    const newPost = posts.find(post => post.postDataId === newPostTreedata.key);
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
      {postData && (
        <div className="mb-5">
          <Editor pageData={postData} postKey={postKey} />
          <FancyHr collection={collection} />
          <EndContentNavigator
            onButtonClick={onNavigationPostClick}
            prevPost={prevPost}
            nextPost={nextPost}
          />
        </div>
      )}
      {!postData && !postDataPending && (
        <div className="text-center my-5 mx-3">
          <h1>There's nothing to see here!</h1>
          <h3>
            Try adjusting the filters in the sidebar to be less restrictive.
          </h3>
        </div>
      )}
    </>
  );
}
export default withFirebase(ContentManager);