import React, { useState } from "react";

import "rc-tree/assets/index.css";
import Tree, { TreeNode } from "rc-tree";

const STYLE = `
  .rc-tree-child-tree {
    display: block;
  }

  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }

  .node-motion-enter,
  .node-motion-leave-active {
    height: 0;
  }
`;

const getSvgIcon = (path, iStyle = {}, style = {}) => {
  return (
    <i style={iStyle}>
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={{ verticalAlign: "-.125em", ...style }}
      >
        <path d={path} />
      </svg>
    </i>
  );
};

const arrowPath =
  "M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88" +
  ".5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3." +
  "6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5." +
  "2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z";

const switcherIcon = obj => {
  if (obj.isLeaf) {
    return getSvgIcon(
      arrowPath,
      { backgroundColor: "rgb(55, 58, 71)" },
      { transform: "rotate(0deg)" }
    );
  }
  return getSvgIcon(
    arrowPath,
    { cursor: "pointer", backgroundColor: "rgb(55, 58, 71)" },
    { transform: `rotate(${obj.expanded ? 90 : 0}deg)` }
  );
};

const onEnterActive = node => {
  return { height: node.scrollHeight };
};

const motion = {
  motionName: "node-motion",
  motionAppear: false,
  onEnterActive,
  onLeaveStart: node => ({ height: node.offsetHeight })
};

/**
 * Renders all pages grouped by date (year/month) in a tree view
 */
export default function Treeview(props) {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(["p1"]);

  const onNodeSelect = function(selectedKeys, e) {
    if (e.node.isLeaf()) {
      setSelectedKeys(selectedKeys);
    } else {
      debugger;
      setExpandedKeys(
        e.node.props.expanded
          ? expandedKeys.filter(k => k !== e.node.props.eventKey)
          : expandedKeys.concat(e.node.props.eventKey)
      );
    }
  };

  const onExpand = function(expandedKeys) {
    debugger;
    setExpandedKeys(expandedKeys);
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <Tree
        className="alec-custom-class-styles"
        checkable={false}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        motion={motion}
        switcherIcon={switcherIcon}
        showIcon={false}
        showLine={true}
        onSelect={onNodeSelect}
        onExpand={onExpand}
      >
        <TreeNode title="parent 1" key="p1">
          <TreeNode key="p10" title="leaf" />
          <TreeNode title="parent 1-1" key="p11">
            <TreeNode title="parent 2-1" key="p21">
              <TreeNode title="leaf" />
              <TreeNode title="leaf" />
            </TreeNode>
            <TreeNode key="p22" title="leaf" />
          </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  );
}
