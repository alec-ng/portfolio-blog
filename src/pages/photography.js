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
import useIndexRedirect from "./../hooks/useIndexRedirect";

/**
 * Page level component for photography section
 * - one time fetch of post index data
 * - determine initial post to show + URL
 */
export default withFirebase(Photography);

function Photography(props) {
  // If collection isn't valid, replace url path with default collection to render
  useIndexRedirect();

  const [loading, setLoading] = React.useState(true);

  // Props for page manager
  const [treeData, setTreeData] = React.useState([]);
  const [idToPostMap, setIdToPostMap] = React.useState({});
  const [keyToPostMap, setKeyToPostMap] = React.useState({});

  const { collection } = useUrlState();
  const { postIndexPending, postIndex } = usePostIndex(
    collection,
    props.firebase
  );

  // One time firebase callout for post index for all published posts
  useEffect(() => {
    if (postIndexPending || !postIndex) {
      return;
    }
    setLoading(true);

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

    setLoading(false);
  }, [postIndexPending, postIndex]);

  return (
    <>
      <LoadingOverlay type="linear" visible={loading} />

      {!loading && (
        <Fade in={!loading}>
          <div className="container-fluid p-0">
            <PageManager
              postIndex={postIndex}
              treeData={treeData}
              idToPostMap={idToPostMap}
              keyToPostMap={keyToPostMap}
              pageName={collection}
            />
          </div>
        </Fade>
      )}
    </>
  );
}
