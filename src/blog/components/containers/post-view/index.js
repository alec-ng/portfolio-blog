import React, { useMemo } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import usePostData from "./usePostData";
import usePrevious from "../../../hooks/usePrevious";

import { getOrderedPosts, usePostEffects } from "./util";
import { getPostMappings } from "../../../util/post-util";
import { constructViewPath, getSlug } from "../../../util/url-util";

import Fade from "@material-ui/core/Fade";
import NotFound from "../../universal/not-found";
import Editor from "../../universal/blog-content/editor";
import Divider from "../../universal/blog-content/blog-post-hr";
import EndContentNavigator from "../../universal/blog-content/end-content-navigator";
import LoadingOverlay from "../../generic/loading-overlay";

/**
 * Container for showing a specific post
 * Validates and only renders content if slug is valid
 */
export default function PostView({ filteredPosts }) {
  const { date, title } = useParams();
  const slug = getSlug(title, date);
  const { slugToPostMap } = useMemo(() => getPostMappings(filteredPosts), [
    filteredPosts
  ]);

  return !filteredPosts || !slugToPostMap[slug] ? (
    <NotFound />
  ) : (
    <PostContent
      filteredPosts={filteredPosts}
      title={title}
      metadata={slugToPostMap[slug]}
    />
  );
}

/**
 * Retrieves actual post data to show and renders the post and footer nav
 */
function PostContent({ filteredPosts, metadata, title }) {
  // Fetch post data
  const { postData, postDataPending } = usePostData(metadata.postDataId);
  usePostEffects(postData, title);

  // Sort posts to match ordering in sidebar tree
  const orderedPosts = useMemo(() => getOrderedPosts(filteredPosts), [
    filteredPosts
  ]);
  const prevId = usePrevious(metadata.postDataId);
  const currIndex = orderedPosts.findIndex(post => post.postDataId === prevId);

  const prevIndex = currIndex - 1 < 0 ? orderedPosts.length - 1 : currIndex - 1;
  const nextIndex = currIndex + 1 >= orderedPosts.length ? 0 : currIndex + 1;

  // On prev/next post click, navigate to chosen post
  const history = useHistory();
  const location = useLocation();

  function onNavigationPostClick(e) {
    const { title, date } =
      e.currentTarget.dataset.direction === "previous"
        ? orderedPosts[prevIndex]
        : orderedPosts[nextIndex];
    history.push(constructViewPath(date, title, location.search));
  }

  return (
    <>
      <LoadingOverlay type="circular" visible={postDataPending} />
      {!postDataPending && (
        <Fade in={true}>
          <div id="global-editor-container">
            <Editor pageData={postData} metadata={metadata} />
            <Divider />
            <EndContentNavigator
              onButtonClick={onNavigationPostClick}
              prevPost={orderedPosts[prevIndex]}
              nextPost={orderedPosts[nextIndex]}
            />
          </div>
        </Fade>
      )}
    </>
  );
}
