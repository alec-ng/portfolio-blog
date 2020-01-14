import React, { useEffect } from "react";
import ResponsiveDrawer from "./responsive-drawer";
import TreeManager from "./tree-manager";
import { useLocation, useHistory } from "react-router-dom";
import { getKeyFromLocation, getPathnameFromIndex } from "../util/url-util";

/**
 * - Composition component for responsive drawer
 * - on Render, fetch postData based off of URL
 */
export default function PhotographyLayout(props) {
  let location = useLocation();
  let history = useHistory();

  const [chosenPost, setChosenPost] = React.useState(props.initialPost);
  const [chosenPostData, setChosenPostData] = React.useState(null);

  function assignNewChosenPost(postId) {
    setChosenPost(postId);
    let chosenPost = props.idToPostMap[postId];
    history.push(getPathnameFromIndex(chosenPost, "photography"));
  }

  useEffect(() => {
    let key = getKeyFromLocation(location.pathname);
    let currPost = props.keyToPostMap[key];
    setChosenPost(currPost.postDataId);

    console.log(
      `Initiating callout for ... ${
        props.idToPostMap[currPost.postDataId].title
      }`
    );
  }, [location]);

  const Content = (
    <>
      <h1>Just a test</h1>
    </>
  );

  return (
    <ResponsiveDrawer content={Content}>
      <TreeManager
        assignNewChosenPost={assignNewChosenPost}
        treeData={props.treeData}
        idToPostMap={props.idToPostMap}
        chosenPost={chosenPost}
      />
    </ResponsiveDrawer>
  );
}
