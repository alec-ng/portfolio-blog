import React, { useState } from "react";
import { useStateValue } from "../state";
import { ACTION_TYPES } from "../reducers/index";
import CreatePostModal from "./create-post-modal";
import TreeView from "./treeview/treeview";
import { createTreeData, getInitialKeys } from "./treeview/tree-util";
import ButtonGroup from "./button-group";
import PageMetadata from "./page-metadata";

const VIEW_POSTS = "posts";
const VIEW_POSTDATA = "postData";

const buttonGroupData = [
  {
    key: VIEW_POSTS,
    label: "View All Posts"
  },
  {
    key: VIEW_POSTDATA,
    label: "Selected Post"
  }
];

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
  const existingIdList = posts.map(post => post.id);
  const treeData = createTreeData(posts);
  const [selectedKeys, initialExpandedKeys] = getInitialKeys(
    chosenPost,
    treeData
  );
  const chosenPostMetadata = chosenPost ? data[chosenPost].post : null;

  const [view, setView] = useState(VIEW_POSTS);
  const [expandedKeys, setExpandedKeys] = useState(initialExpandedKeys);

  /**
   * If leaf, update seleted post state
   * If not a leaf, expand and show its children
   */
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf()) {
      let postId = e.node.props.eventKey.replace("post-", "");
      if (chosenPost === postId) {
        return;
      }
      dispatch({
        type: ACTION_TYPES.SELECT_POST,
        payload: {
          id: postId
        }
      });
      setView(VIEW_POSTDATA);
    } else {
      setExpandedKeys(
        e.node.props.expanded
          ? expandedKeys.filter(k => k !== e.node.props.eventKey)
          : expandedKeys.concat(e.node.props.eventKey)
      );
    }
  }

  /**
   * fully controlled list of expanded tree nodes
   */
  function onExpand(expandedKeys) {
    setExpandedKeys(expandedKeys);
  }

  /**
   * executes the save cb supplied and upon success, clears all change history
   */
  function onSave() {
    // optional: list the changes made
    // for all post data, update the lastModified stamp to (new Date()).toISOString()

    function onComplete(isSuccess) {
      dispatch({
        type: ACTION_TYPES.CLEAR_HISTORY
      });
      alert("successfully saved");
    }
    props.onSave(changeList, data, onComplete);
  }

  /**
   * Creates a new post in state and adjust expanded tree nodes to show
   * the newly created post
   * Toggle the toolbar view to show page metadata
   */
  function onPostCreate(newPost) {
    dispatch({
      type: ACTION_TYPES.CREATE_POST,
      payload: newPost
    });
    // update expanded keys
    const [year, month] = newPost.date.split("-");
    const expandedKeys = [`year-${year}`, `month-${year}-${month}`];
    setExpandedKeys(expandedKeys);
    setView(VIEW_POSTDATA);
  }

  function onPostDelete(e) {
    // "Are you sure" confirmation?
    // on "yes" - mutateHistory()
  }

  function toggleView(e) {
    setView(e.currentTarget.dataset.buttonkey);
  }

  return (
    <>
      <div className="mb-3">
        <ButtonGroup
          buttons={buttonGroupData}
          activeKey={view}
          onClick={toggleView}
        />
      </div>

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
            <CreatePostModal
              onSubmit={onPostCreate}
              existingIdList={existingIdList}
            />
            <br />
            <button type="button" onClick={onSave} className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </>
      )}

      {view === VIEW_POSTDATA && (
        <PageMetadata
          chosenPost={chosenPostMetadata}
          existingIdList={existingIdList}
          onDelete={onPostDelete}
        />
      )}
    </>
  );
}
