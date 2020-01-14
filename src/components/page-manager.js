import React, { useEffect } from "react";
import ResponsiveDrawer from "./responsive-drawer";
import TreeManager from "./tree-manager";
import { useLocation, useHistory } from "react-router-dom";
import { getKeyFromLocation, getPathnameFromIndex } from "../util/url-util";
import { withFirebase } from "./firebase";

import { ScrapbookEditor } from "./scrapbook-editor/scrapbook-editor";
import Image from "./scrapbook-editor/plugins/image/index";
import Markdown from "./scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "./scrapbook-editor/plugins/cover-photo/index";
import Spacer from "./scrapbook-editor/plugins/spacer/index";
import Carousel from "./scrapbook-editor/plugins/carousel/index";
import Video from "./scrapbook-editor/plugins/video/index";

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

/**
 * - Composition component for responsive drawer
 * - on Render, fetch postData based off of URL
 */
export default withFirebase(PhotographyLayout);

function PhotographyLayout(props) {
  let location = useLocation();
  let history = useHistory();

  const [chosenPost, setChosenPost] = React.useState(props.initialPost);
  const [chosenPostData, setChosenPostData] = React.useState(null);

  function assignNewChosenPost(postId) {
    setChosenPost(postId);
    let chosenPost = props.idToPostMap[postId];
    history.push(getPathnameFromIndex(chosenPost, "photography"));
  }

  // On location change, make a callout to get the chosen post's data and render it.
  useEffect(() => {
    let key = getKeyFromLocation(location.pathname);
    let currPost = props.keyToPostMap[key];
    setChosenPost(currPost.postDataId);
    props.firebase
      .singlePostData(chosenPost)
      .get()
      .then(doc => {
        setChosenPostData(doc.data());
      })
      .catch(failure => {
        alert(failure);
      });
  }, [location]);

  const Content = (
    <>
      {chosenPostData && (
        <ScrapbookEditor
          readOnly={true}
          pageData={chosenPostData}
          plugins={plugins}
          key={JSON.stringify(chosenPostData)}
        />
      )}
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
