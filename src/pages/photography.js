import React, { useEffect } from "react";
import { createTreeData } from "../components/rc-tree/util";
import { withFirebase } from "../components/firebase";
import { useLocation, Redirect } from "react-router-dom";
import {
  getKeyFromLocation,
  getKeyFromIndex,
  getPathnameFromIndex
} from "./../util/url-util";

import PageManager from "../components/page-manager";
import Fade from "@material-ui/core/Fade";
import LoadingOverlay from "../components/loading-overlay";

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

  // One time firebase callout for post index for all published posts
  useEffect(() => {
    // firebase callout for post index for all published posts
    props.firebase
      .postIndex()
      .get()
      .then(doc => {
        // Create nodes for treeview
        let posts = doc.data().index;
        let treeData = createTreeData(posts);
        setTreeData(treeData);

        // Mapping of Id -> post
        let localIdDataMap = {};
        let localKeyDataMap = {};
        posts.forEach(post => {
          localIdDataMap[post.postDataId] = post;
          localKeyDataMap[getKeyFromIndex(post)] = post;
        });
        setIdToPostMap(localIdDataMap);
        setKeyToPostMap(localKeyDataMap);

        // Decide which post to show first
        // default to latest post in treeData if no valid initial post provided
        let chosenPost;
        if (initialPostKey) {
          chosenPost = posts.find(
            post =>
              getKeyFromIndex(post).toUpperCase() ===
              initialPostKey.toUpperCase()
          );
        }
        if (chosenPost) {
          setInitialPost(chosenPost.postDataId);
        } else {
          let mostRecentPostId = treeData[0].children[0].children[0].key;
          setInitialPost(mostRecentPostId);
          setInitialRedirectPath(
            getPathnameFromIndex(
              localIdDataMap[mostRecentPostId],
              "photography"
            )
          );
          setDoInitialRedirect(true);
        }

        setLoading(false);
      })
      .catch(failure => {
        alert(failure);
        setLoading(false);
      });
  }, []);

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
