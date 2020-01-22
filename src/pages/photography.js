import React, { useEffect } from "react";
import { createTreeData } from "../components/rc-tree/util";
import { withFirebase } from "../components/firebase";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import {
  getKeyFromLocation,
  getKeyFromIndex,
  getPathnameFromIndex
} from "./../util/url-util";

import PageManager from "../components/page-manager";
import Fade from "@material-ui/core/Fade";
import LoadingOverlay from "../components/loading-overlay";

import useUrlState from "./../hooks/useUrlState";
import usePostIndex from "./../hooks/usePostIndex";

const pageName = "photography";

/**
 * Page level component for photography section
 * - one time fetch of post index data
 * - determine initial post to show + URL
 */
export default withFirebase(Photography);

function Photography(props) {
  const [loading, setLoading] = React.useState(true);

  // Props for page manager
  const [treeData, setTreeData] = React.useState([]);
  const [initialPost, setInitialPost] = React.useState(null);
  const [idToPostMap, setIdToPostMap] = React.useState({});
  const [keyToPostMap, setKeyToPostMap] = React.useState({});

  // If initial page loaded is invalid, default to first valid page
  const [doInitialRedirect, setDoInitialRedirect] = React.useState(false);
  const [initialRedirectPath, setInitialRedirectPath] = React.useState(null);

  const initialPostKey = getKeyFromLocation(useLocation().pathname);

  const { collection } = useUrlState();
  const { postIndexPending, postIndex, postIndexRedirect } = usePostIndex(
    collection,
    props.firebase
  );

  // One time firebase callout for post index for all published posts
  useEffect(() => {
    if (postIndexPending || !postIndex) {
      return;
    }

    // Create nodes for treeview
    let treeData = createTreeData(postIndex);
    setTreeData(treeData);

    // Mapping of Id -> post
    let localIdDataMap = {};
    let localKeyDataMap = {};
    postIndex.forEach(post => {
      localIdDataMap[post.postDataId] = post;
      localKeyDataMap[getKeyFromIndex(post)] = post;
    });
    setIdToPostMap(localIdDataMap);
    setKeyToPostMap(localKeyDataMap);

    // Decide which post to show first
    // default to latest post in treeData if no valid initial post provided
    let chosenPost;
    if (initialPostKey) {
      chosenPost = postIndex.find(
        post =>
          getKeyFromIndex(post).toUpperCase() === initialPostKey.toUpperCase()
      );
    }
    if (chosenPost) {
      setInitialPost(chosenPost.postDataId);
    } else {
      let mostRecentPostId = treeData[0].children[0].children[0].key;
      setInitialPost(mostRecentPostId);
      setInitialRedirectPath(
        "/blog" +
          getPathnameFromIndex(localIdDataMap[mostRecentPostId], "photography")
      );
      setDoInitialRedirect(true);
    }

    setLoading(false);
  }, [postIndexPending, postIndex, postIndexRedirect]);

  return (
    <>
      {doInitialRedirect && <Redirect to={initialRedirectPath} />}

      <LoadingOverlay type="linear" visible={loading} />

      {!loading && (
        <Fade in={!loading}>
          <div className="container-fluid p-0">
            <PageManager
              treeData={treeData}
              initialPost={initialPost}
              idToPostMap={idToPostMap}
              keyToPostMap={keyToPostMap}
              pageName={pageName}
            />
          </div>
        </Fade>
      )}
    </>
  );
}
