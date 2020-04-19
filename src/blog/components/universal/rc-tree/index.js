import React from "react";
import switcherIcon from "./switcher";
import "rc-tree/assets/index.css";
import "./overrides.css";
import Tree from "rc-tree";

/**
 * Renders a treeview that provides options for a initially selected post.
 */
export default function Treeview({
  treeData,
  expandedKeys,
  selectedKeys,
  onNodeSelect,
  onExpand
}) {
  return (
    <>
      {treeData && treeData.length ? (
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
          treeData={treeData}
        />
      ) : (
        <p>There are no posts to show.</p>
      )}
    </>
  );
}

// -------------- Animtations

const onEnterActive = node => {
  return { height: node.scrollHeight };
};

const motion = {
  motionName: "node-motion",
  motionAppear: false,
  onEnterActive,
  onLeaveStart: node => ({ height: node.offsetHeight })
};
