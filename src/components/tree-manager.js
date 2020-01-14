import React, { useEffect } from "react";
import TreeView from "./rc-tree/treeview";
import { getInitialExpandedKeys } from "./rc-tree/util";
import { useLocation, Redirect } from "react-router-dom";
import {
  getKeyFromLocation,
  getKeyFromIndex,
  getPathnameFromIndex
} from "./../util/url-util";

/**
 * Renders a treeview with all published posts
 * Handles URL redirection based off post to show
 */
export default function TreeManager(props) {
  // fully controlled tree state
  const [chosenPost, setChosenPost] = React.useState([props.initialPost]);
  const [expandedKeys, setExpandedKeys] = React.useState(
    getInitialExpandedKeys(props.idToPostMap[chosenPost].date, props.treeData)
  );

  // If leaf, make callout to get chosen post
  // If not a leaf, expand and show its children
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf()) {
      setChosenPost(selectedKeys);
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

  const currIndexElement = props.idToPostMap[chosenPost];
  const currChosenKey = getKeyFromIndex(currIndexElement);
  const urlKey = getKeyFromLocation(useLocation().pathname);
  const doRedirect = urlKey !== currChosenKey;
  const expectedCurrentPath = getPathnameFromIndex(
    currIndexElement,
    "photography"
  );
  console.log("doRedirect: " + doRedirect);
  console.log(`chosenPost: ${chosenPost}`);

  return (
    <>
      {doRedirect && <Redirect push to={expectedCurrentPath} />}
      <TreeView
        treeData={props.treeData}
        onNodeSelect={onNodeSelect}
        expandedKeys={expandedKeys}
        selectedKeys={chosenPost}
        onExpand={onExpand}
      />
    </>
  );
}
