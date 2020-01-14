import React, { useEffect } from "react";
import ResponsiveDrawer from "./responsive-drawer";
import TreeManager from "./tree-manager";
import { useLocation } from "react-router-dom";
import {
  getKeyFromLocation,
  getKeyFromIndex,
  getPathnameFromIndex
} from "./../util/url-util";

/**
 * - Composition component for responsive drawer
 * - on Render, fetch postData based off of URL
 */
export default function PhotographyLayout(props) {
  console.log("LayoutRender");

  const [chosenPostData, setChosenPostData] = React.useState(null);

  const urlKey = getKeyFromLocation(useLocation().pathname);
  if (props.keyToPostMap[urlKey]) {
    console.log("Time to get data");
  }

  const Content = (
    <>
      <h1>Just a test</h1>
    </>
  );

  return (
    <ResponsiveDrawer content={Content}>
      <TreeManager
        treeData={props.treeData}
        idToPostMap={props.idToPostMap}
        initialPost={props.initialPost}
      />
    </ResponsiveDrawer>
  );
}
