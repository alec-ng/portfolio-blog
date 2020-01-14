import React, { useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { createTreeData } from "../components/rc-tree/util";
import { withFirebase } from "../components/firebase";
import styled from "styled-components";
import Layout from "../components/photography-layout";
import { useLocation } from "react-router-dom";
import { getKeyFromLocation, getKeyFromIndex } from "./../util/url-util";

const OverlayContainer = styled.div`
  position: absolute;
  display: ${props => (props.show ? "flex" : "none")};
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 50%;
  left: 25%;
  right: 25%;
  background-color: white;
`;

/**
 * Page level component for photography section
 * - one time fetch of post index data
 * - determine initial post to show + URL
 */
export default withFirebase(Photography);

function Photography(props) {
  const [loading, setLoading] = React.useState(true);
  const [treeData, setTreeData] = React.useState([]);
  const [initialPost, setInitialPost] = React.useState(null);
  const [idToPostMap, setIdToPostMap] = React.useState({});
  const [keyToPostMap, setKeyToPostMap] = React.useState({});

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
      <OverlayContainer show={loading}>
        <LinearProgress />
      </OverlayContainer>
      {!loading && (
        <div className="container-fluid p-0">
          <Layout
            treeData={treeData}
            initialPost={initialPost}
            idToPostMap={idToPostMap}
            keyToPostMap={keyToPostMap}
          />
        </div>
      )}
    </>
  );
}
