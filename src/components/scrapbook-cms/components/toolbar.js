import React, { useState } from "react";
import { useStateValue } from "../state";
import PageMetadata from "./page-metadata";
import TreeView from "./treeview";

const VIEW_POSTS = "posts";
const VIEW_POSTDATA = "postData";

/**
 * State manager for sidebar functionality
 * Renders two views: treeview and post data
 * 1. shows all pages loaded in a treeview
 * 2. if a page is chosen, shows its metadata<Menu>
 */
export default function Toolbar(props) {
  const [view, setView] = useState(VIEW_POSTS);

  const onSave = function() {
    props.onSave();
    // props.onSave should accept a cb that, when run, will let us know if the
    // updates were successful. if yes, then clear the change list
  };

  const onPostSelect = function(e) {
    // update chosenPost with selection
    let postId = e.currentTarget.dataset.postId;
    // check if current postData is same as one passed in to plugin initially
  };

  const onPostCreate = function(e) {
    // open modal or section with required title, date,
    // validation -- title should be unique across all posts
    // on successful validation - mutateHistory()
  };

  const onPostDelete = function(e) {
    // "Are you sure" confirmation?
    // on "yes" - mutateHistory()
  };

  return (
    <>
      {view === VIEW_POSTS && <TreeView />}
      {view === VIEW_POSTDATA && <h1>postdata todo</h1>}
    </>
  );
}
