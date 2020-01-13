import React, { useState } from "react";
import { createTreeData, getInitialKeys } from "./treeview/tree-util";
import TreeView from "./treeview/treeview";
import CreatePostModal from "./create-post-modal";

/**
 * "View All Posts" view in toolbar
 */
export default function PostManager(props) {
  // create tree and post modal data based on props
  const treeData = createTreeData(props.data);
  const existingKeyList = Object.keys(props.data).map(id =>
    props.data[id].post.key.toUpperCase()
  );

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
      const [year, month, day, id] = e.node.props.eventKey.split("-");
      props.onNodeSelect(id);
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
          existingKeyList={existingKeyList}
        />
      </div>
    </>
  );
}
