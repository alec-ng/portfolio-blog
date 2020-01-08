import React, { useState } from "react";
import { useStateValue } from "./../state";
import switcherIcon from "./treeview-switcher";
import "rc-tree/assets/index.css";
import "./treeview.css";
import Tree from "rc-tree";

/**
 *
 */
export default function Treeview(props) {
  // fully controlled selected/expanded state of treeview
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(["p1"]);

  // if expandable, expand. else, select leaf
  const onNodeSelect = function(selectedKeys, e) {
    if (e.node.isLeaf()) {
      setSelectedKeys(selectedKeys);
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
      treeData={testData}
    />
  );
}

const testData = [
  {
    key: "year_2019",
    title: "2019",
    children: [
      {
        key: "month_Jan",
        title: "Jan",
        children: [
          {
            key: "Yak Peak",
            title: "Yak Peak"
          },
          {
            key: "Coquihalla",
            title: "Coquihalla"
          }
        ]
      },
      {
        key: "month_Feb",
        title: "Feb",
        children: [
          {
            key: "Nepal",
            title: "Nepal"
          }
        ]
      }
    ]
  },
  {
    key: "year_2018",
    title: "2018",
    children: [
      {
        key: "month_May",
        title: "May",
        children: [
          {
            key: "Juan de Fuca",
            title: "Juan de Fuca"
          }
        ]
      }
    ]
  }
];

/**
 * Used for animation of node expansion
 */
const onEnterActive = node => {
  return { height: node.scrollHeight };
};
const motion = {
  motionName: "node-motion",
  motionAppear: false,
  onEnterActive,
  onLeaveStart: node => ({ height: node.offsetHeight })
};
