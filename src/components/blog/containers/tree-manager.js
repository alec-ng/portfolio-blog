import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import useUrlState from "../../../hooks/useUrlState";
import useTransformedIndexData from "../../../hooks/useTransformedIndexData";
import {
  getInitialExpandedKeys,
  createTreeData
} from "../generic/rc-tree/util";
import { constructPath } from "../../../util/url-util";

import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import { StyledSidebarButton } from "../universal/styled-sidebar-elements";

import TreeView from "../generic/rc-tree";

/**
 * treeview whose selected node is synchronized with the URL post-key
 */
export default function TreeManager({ posts }) {
  const history = useHistory();
  // read the current URL for global state data TODO: get filters here
  const { collection, postKey, postDate, filters } = useUrlState();
  // create utility data structures from collection data
  const { idToPostMap, keyToPostMap } = useTransformedIndexData(posts);
  // generate nodes to show in tree
  const { treeData, monthKeys, yearKeys } = useTreeData(posts);

  /**
   * Open all month and year nodes
   */
  function expandAll() {
    if (!treeData) {
      return;
    }
    const allNodesLen = monthKeys.length + yearKeys.length;
    if (expandedKeys.length === allNodesLen) {
      return;
    }
    setExpandedKeys(monthKeys.concat(yearKeys));
  }

  const [selectedKey, setSelectedKey] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState([]);

  /**
   * Remove all vals from expandedKeys except the ones to show the current post
   */
  const minimize = useCallback(() => {
    if (!treeData) {
      return;
    }
    const [yearNodeKey, monthNodeKey] = getInitialExpandedKeys(
      postDate,
      treeData
    );
    if (
      expandedKeys.length !== 2 ||
      expandedKeys.indexOf(yearNodeKey) === -1 ||
      expandedKeys.indexOf(monthNodeKey) === -1
    ) {
      setExpandedKeys([yearNodeKey, monthNodeKey]);
    }
  }, [postDate, treeData, expandedKeys]);

  /**
   * effect logic to set selected key based on global URL changes
   */
  useEffect(() => {
    // invalid URL supplied
    if (!postKey || !keyToPostMap || !keyToPostMap[postKey.toUpperCase()]) {
      return;
    }
    // Case where user was just interacting with tree but same post is being shown
    const newKey = keyToPostMap[postKey.toUpperCase()].postDataId;
    if (newKey !== selectedKey) {
      setSelectedKey(newKey);
      minimize();
    }
  }, [
    postKey,
    keyToPostMap,
    selectedKey,
    postDate,
    treeData,
    expandedKeys,
    minimize
  ]);

  /**
   * If leaf, make callout to get chosen post
   * If not a leaf, expand and show its children
   */
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf() && selectedKeys.length) {
      const newPost = idToPostMap[selectedKeys[0]];
      const newUrl = constructPath(
        collection,
        newPost.date,
        newPost.title,
        filters
      );
      history.push(newUrl);
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
      <div className="mb-2">
        <StyledSidebarButton type="button" onClick={expandAll}>
          <ArrowDownwardOutlinedIcon /> Expand All
        </StyledSidebarButton>
        <StyledSidebarButton type="button" onClick={minimize}>
          <ArrowForwardOutlinedIcon /> Minimize
        </StyledSidebarButton>
      </div>
      <TreeView
        treeData={treeData}
        onNodeSelect={onNodeSelect}
        expandedKeys={expandedKeys}
        selectedKeys={[selectedKey]}
        onExpand={onExpand}
      />
    </>
  );
}

/**
 * Hook to generate rc-tree nodes based off of filtered post collection data
 */
function useTreeData(posts) {
  const [treeData, setTreeData] = useState(null);
  const [yearKeys, setYearKeys] = useState(null);
  const [monthKeys, setMonthKeys] = useState(null);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      setTreeData(null);
      return;
    }
    const data = createTreeData(posts);
    setTreeData(data.treeData);
    setMonthKeys(data.monthKeys);
    setYearKeys(data.yearKeys);
  }, [posts]);

  return { treeData, yearKeys, monthKeys };
}
