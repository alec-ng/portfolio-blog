import React, { useState } from "react";
import switcherIcon from "./treeview-switcher";
import "rc-tree/assets/index.css";
import "./treeview.css";
import Tree from "rc-tree";
import { motion, getInitialKeys } from "./tree-util";

/**
 * Renders a treeview that provides options for a initially selected post.
 */
export default function Treeview(props) {
  const [initialSelectedKeys, initialExpandedKeys] = getInitialKeys(
    props.chosenNode,
    props.treeData
  );
  const [selectedKeys, setSelectedKeys] = useState(initialSelectedKeys);
  const [expandedKeys, setExpandedKeys] = useState(initialExpandedKeys);

  // if expandable, expand. else, select leaf and execute nodeSelect cb
  const onNodeSelect = function(selectedKeys, e) {
    if (e.node.isLeaf()) {
      setSelectedKeys(selectedKeys);
      props.onNodeSelect(e.node.props.eventKey);
    } else {
      setExpandedKeys(
        e.node.props.expanded
          ? expandedKeys.filter(k => k !== e.node.props.eventKey)
          : expandedKeys.concat(e.node.props.eventKey)
      );
    }
  };

  const onExpand = function(expandedKeys) {
    setExpandedKeys(expandedKeys);
  };

  return (
    <>
      {props.treeData && props.treeData.length ? (
        <Tree
          checkable={false}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          motion={motion}
          switcherIcon={switcherIcon}
          showIcon={false}
          showLine={true}
          onSelect={onNodeSelect}
          onExpand={onExpand}
          treeData={props.treeData}
        />
      ) : (
        <p>You have no posts to show.</p>
      )}
    </>
  );
}
