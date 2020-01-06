import React from "react";
import Tree from "react-animated-tree";

/**
 * Renders all pages grouped by date (year/month) in a tree view
 */
export default function TreeView(props) {
  // create mapping of year -> month -> true

  return (
    <Tree
      content="Apple"
      type="Fruit"
      open
      canHide
      visible
      onClick={console.log}
    >
      <Tree content="Contents">
        <Tree content="Seeds" />
        <Tree content="Seeds" />
        <Tree content="Seeds" />
        <Tree content="Seeds" />
      </Tree>
    </Tree>
  );
}
