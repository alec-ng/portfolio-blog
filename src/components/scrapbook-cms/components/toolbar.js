import React, { useState } from "react";
import { useStateValue } from "../state";
import { ACTION_TYPES } from "../reducers/index";
import CreatePostModal from "./create-post-modal";
import TreeView from "./treeview/treeview";
import { createTreeData, getInitialKeys } from "./treeview/tree-util";

const VIEW_POSTS = "posts";
const VIEW_POSTDATA = "postData";

/**
 * State manager for sidebar functionality
 * Renders two views: treeview and post data
 * 1. shows all pages loaded in a treeview
 * 2. if a page is chosen, shows its metadata<Menu>
 */
export default function Toolbar(props) {
  const [{ chosenPost, data, changeList }, dispatch] = useStateValue();

  const posts = [];
  Object.keys(data).forEach(key => {
    posts.push(data[key].post);
  });
  const titles = posts.map(post => post.title);
  const treeData = createTreeData(posts);
  const [selectedKeys, initialExpandedKeys] = getInitialKeys(
    chosenPost,
    treeData
  );
  const [view, setView] = useState(VIEW_POSTS);
  const [expandedKeys, setExpandedKeys] = useState(initialExpandedKeys);

  // if expandable, expand. else, select leaf and execute nodeSelect cb
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf()) {
      onPostSelect(e.node.props.eventKey);
    } else {
      setExpandedKeys(
        e.node.props.expanded
          ? expandedKeys.filter(k => k !== e.node.props.eventKey)
          : expandedKeys.concat(e.node.props.eventKey)
      );
    }
  }

  function onExpand(expandedKeys) {
    setExpandedKeys(expandedKeys);
  }

  function onSave() {
    // optional: list the changes made

    function onComplete(isSuccess) {
      // dispatch -- clear change list
      // fire success modal
    }
    props.onSave(changeList, data, onComplete);
    // props.onSave should accept a cb that, when run, will let us know if the
  }

  function onPostSelect(selectedKey) {
    let postId = selectedKey.replace("post-", "");
    if (chosenPost === postId) {
      return;
    }
    dispatch({
      type: ACTION_TYPES.SELECT_POST,
      payload: {
        id: postId
      }
    });
  }

  function onPostCreate(newPost) {
    dispatch({
      type: ACTION_TYPES.CREATE_POST,
      payload: newPost
    });
    // update expanded keys
    const [year, month] = newPost.date.split("-");
    const expandedKeys = [`year-${year}`, `month-${year}-${month}`];
    setExpandedKeys(expandedKeys);
  }

  function onPostDelete(e) {
    // "Are you sure" confirmation?
    // on "yes" - mutateHistory()
  }

  return (
    <>
      {view === VIEW_POSTS && (
        <>
          <div className="mb-4">
            <TreeView
              treeData={treeData}
              onNodeSelect={onNodeSelect}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              onExpand={onExpand}
            />
          </div>
          <div className="text-center">
            <CreatePostModal onSubmit={onPostCreate} titles={titles} />
            <br />
            <button type="button" onClick={onSave} className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </>
      )}
      {view === VIEW_POSTDATA && <h1>postdata todo</h1>}
    </>
  );
}
