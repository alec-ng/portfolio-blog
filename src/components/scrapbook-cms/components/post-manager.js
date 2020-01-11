import React, { useState } from "react";
import { createTreeData, getInitialKeys } from "./treeview/tree-util";
import TreeView from "./treeview/treeview";
import CreatePostModal from "./create-post-modal";

/**
 * "View All Posts" view in toolbar
 */
export default function PostManager(props) {
  // create tree and post modal data based on props
  let posts = [];
  Object.keys(props.data).forEach(key => {
    posts.push(props.data[key].post);
  });
  const treeData = createTreeData(posts);
  const existingIdList = posts.map(post => post.id);

  // fully controlled tree state
  const [selectedKeys, initialExpandedKeys] = getInitialKeys(
    props.chosenPost ? props.chosenPost.key : null,
    treeData
  );
  const [expandedKeys, setExpandedKeys] = useState(initialExpandedKeys);

  // If leaf, update seleted post state
  // If not a leaf, expand and show its children
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf()) {
      let postId = e.node.props.eventKey.replace("post-", "");
      if (props.chosenPost.key === postId) {
        return;
      }
      props.onNodeSelect(postId);
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

  return (
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
          onSubmit={props.onPostCreate}
          existingIdList={existingIdList}
        />
      </div>
    </>
  );
}
