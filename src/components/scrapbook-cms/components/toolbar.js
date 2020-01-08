import React, { useState } from "react";
import { useStateValue } from "../state";
import PageMetadata from "./page-metadata";
import CreatePostModal from "./create-post-modal";
import TreeView from "./treeview/treeview";
import { createTreeData } from "./treeview/tree-util";

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

  const [{ chosenPost, data }, dispatch] = useStateValue();

  const onSave = function() {
    props.onSave();
    // props.onSave should accept a cb that, when run, will let us know if the
    // updates were successful. if yes, then clear the change list
  };

  const onPostSelect = function(selectedKey) {
    console.log(selectedKey);
    // update chosenPost with selection
    // check if current postData is same as one passed in to plugin initially
  };

  const onPostCreate = function(newPost) {
    console.log(newPost);
    // Dispatch create new post event
    // close the modal
    // clear the form's input values

    // validation -- title should be unique across all posts
  };

  const onPostDelete = function(e) {
    // "Are you sure" confirmation?
    // on "yes" - mutateHistory()
  };

  const treeData = createTreeData(sampleData);
  return (
    <>
      {view === VIEW_POSTS && (
        <>
          <TreeView
            chosenNode="post-2019-05-11-Nepal"
            treeData={treeData}
            onNodeSelect={onPostSelect}
          />
          <CreatePostModal onSubmit={onPostCreate} titles={["test"]} />
        </>
      )}
      {view === VIEW_POSTDATA && <h1>postdata todo</h1>}
    </>
  );
}

const sampleData = [
  {
    title: "Nepal",
    date: "2019-05-11"
  },
  {
    title: "Juan de Fuca",
    date: "2019-05-15"
  },
  {
    title: "Slalok Mountain",
    date: "2016-01-01"
  },
  {
    title: "Rainbow Mountain",
    date: "2016-06-14"
  }
];
