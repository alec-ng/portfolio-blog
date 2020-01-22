import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPathnameFromIndex } from "../util/url-util";
import { withFirebase } from "./firebase";

import ResponsiveDrawer from "./responsive-drawer";
import NavLinkGroup from "./nav-link-group";
import TreeManager from "./tree-manager";
import BlogContent from "./blog-content";

import useUrlState from "./../hooks/useUrlState";
import usePostData from "./../hooks/usePostData";

/**
 * Top level component for tree / content synchronization
 * Adjusts url based on tree node chosen, and fetches the corresponding data
 */
export default withFirebase(PhotographyLayout);

function PhotographyLayout(props) {
  const history = useHistory();

  const [chosenPost, setChosenPost] = React.useState(props.initialPost);

  function assignNewChosenPost(postId) {
    setChosenPost(postId);
    let chosenPost = props.idToPostMap[postId];
    history.push(getPathnameFromIndex(chosenPost, "photography"));
  }

  const { postKey } = useUrlState();
  useEffect(() => {
    if (postKey) {
      const currPost = props.keyToPostMap[postKey];
      setChosenPost(currPost ? currPost.postDataId : null);
      document.title = currPost.title;
    }
  }, [postKey]);

  const { postData, postDataPending, postDataError } = usePostData(
    chosenPost,
    props.firebase
  );

  const Content = <BlogContent postData={postData} loading={postDataPending} />;

  return (
    <ResponsiveDrawer content={Content}>
      <div className="mb-4 p-2">
        <NavLinkGroup pageName={props.pageName} />
      </div>
      <TreeManager
        assignNewChosenPost={assignNewChosenPost}
        treeData={props.treeData}
        idToPostMap={props.idToPostMap}
        chosenPost={chosenPost}
      />
    </ResponsiveDrawer>
  );
}
