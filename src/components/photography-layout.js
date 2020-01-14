import React from "react";
import ResponsiveDrawer from "./responsive-drawer";
import ContentRenderer from "./content-renderer";
import TreeView from "./rc-tree/treeview";
import { getInitialExpandedKeys } from "./rc-tree/util";
import { Redirect } from "react-router-dom";
import { getPathnameFromIndex } from "./../util/url-util";

const BASE_PAGE = "/photography";

export default function PhotographyLayout(props) {
  const [chosenPost, setChosenPost] = React.useState(props.initialPost);

  // fully controlled tree state
  let dateToExpand = props.idToPostMap[chosenPost].date;
  const [expandedKeys, setExpandedKeys] = React.useState(
    getInitialExpandedKeys(dateToExpand, props.treeData)
  );

  // If leaf, make callout to get chosen post
  // If not a leaf, expand and show its children
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf()) {
      alert("todo!");
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

  const Sidebar = (
    <>
      <TreeView
        treeData={props.treeData}
        onNodeSelect={onNodeSelect}
        expandedKeys={expandedKeys}
        selectedKeys={[chosenPost]}
        onExpand={onExpand}
      />
    </>
  );

  const Content = (
    <>
      <h1>Just a test</h1>
    </>
  );

  return (
    <>
      <ResponsiveDrawer content={Content} sidebar={Sidebar} />
    </>
  );
}
