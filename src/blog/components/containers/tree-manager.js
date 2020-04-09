import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import useUrlState from "../../hooks/useUrlState";
import useUrlView from "../../hooks/useUrlView";

import {
  createTreeData,
  getInitialExpandedKeys
} from "../universal/rc-tree/util";
import { constructPath } from "../../util/url-util";
import { getPostMappings } from "../../util/post-util";
import { APP_VIEW } from "../../util/constants";

import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import { StyledSidebarButton } from "../universal/styled-sidebar-elements";
import TreeView from "../universal/rc-tree";

/**
 * treeview whose selected node is synchronized with the URL post-key
 */
export default function TreeManager({ posts }) {
  const history = useHistory();
  const { collection, postKey, postDate, filters } = useUrlState();
  const view = useUrlView();

  /**
   * Memoized data structures based on posts provided
   */
  const { idToPostMap, keyToPostMap } = useMemo(() => getPostMappings(posts), [
    posts
  ]);
  const { treeData, monthKeys, yearKeys } = useMemo(
    () => (posts ? createTreeData(posts) : {}),
    [posts]
  );

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
   * If in map view, collapses all nodes
   * If in post view, collapses all ndoes except the ones to show the current post
   */
  const minimize = useCallback(() => {
    if (!treeData) {
      return;
    }
    if (view === APP_VIEW.map) {
      setExpandedKeys([]);
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
  }, [postDate, treeData, expandedKeys, view]);

  /**
   * effect logic to set selected key based on global URL changes
   */
  useEffect(() => {
    // tree not active during map view
    if (view === APP_VIEW.map) {
      setSelectedKey(null);
      return;
    }
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
    view,
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
