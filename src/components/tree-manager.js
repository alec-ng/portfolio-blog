import React from "react";
import TreeView from "./rc-tree/treeview";
import { getInitialExpandedKeys } from "./rc-tree/util";

/**
 * Rc-tree with fully controlled selected node state
 */
export default function TreeManager(props) {
  // fully controlled tree state
  const [expandedKeys, setExpandedKeys] = React.useState(
    getInitialExpandedKeys(
      props.idToPostMap[props.chosenPost].date,
      props.treeData
    )
  );

  // If leaf, make callout to get chosen post
  // If not a leaf, expand and show its children
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf() && selectedKeys[0] !== props.chosenPost) {
      props.assignNewChosenPost(selectedKeys[0]);
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
      <TreeView
        treeData={props.treeData}
        onNodeSelect={onNodeSelect}
        expandedKeys={expandedKeys}
        selectedKeys={[props.chosenPost]}
        onExpand={onExpand}
      />
    </>
  );
}
