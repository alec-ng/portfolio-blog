import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getKeyFromLocation, getPathnameFromIndex } from "../util/url-util";
import { withFirebase } from "./firebase";

import ResponsiveDrawer from "./responsive-drawer";
import NavLinkGroup from "./nav-link-group";
import TreeManager from "./tree-manager";
import LoadingOverlay from "./loading-overlay";

import { ScrapbookEditor } from "./scrapbook-editor/scrapbook-editor";
import Image from "./scrapbook-editor/plugins/image/index";
import Markdown from "./scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "./scrapbook-editor/plugins/cover-photo/index";
import Spacer from "./scrapbook-editor/plugins/spacer/index";
import Carousel from "./scrapbook-editor/plugins/carousel/index";
import Video from "./scrapbook-editor/plugins/video/index";

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

/**
 * Top level component for tree / content synchronization
 * Adjusts url based on tree node chosen, and fetches the corresponding data
 */
export default withFirebase(PhotographyLayout);

function PhotographyLayout(props) {
  let location = useLocation();
  let history = useHistory();

  const [chosenPost, setChosenPost] = React.useState(props.initialPost);
  const [chosenPostData, setChosenPostData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

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
    setLoading(true);
    props.firebase
      .singlePostData(chosenPost)
      .get()
      .then(doc => {
        setChosenPostData(doc.data());
        setLoading(false);
      })
      .catch(failure => {
        alert(failure);
        setLoading(false);
      });
  }, [location]);

  const Content = (
    <>
      <LoadingOverlay type="circular" visible={loading} />
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
