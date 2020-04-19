import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { createTreeData, getDateNodeKeys } from "../universal/rc-tree/util";
import { constructViewPath, getSlug } from "../../util/url-util";
import { getPostMappings } from "../../util/post-util";

import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import {
  StyledSidebarButton,
  PaddedContainer
} from "../universal/layout/styled-sidebar-elements";
import TreeView from "../universal/rc-tree";

/**
 * treeview whose selected node is synchronized with the URL post-key
 */
export default function TreeManager({ posts, closeDrawer }) {
  const { view, date, title } = useParams();
  const slug = view === "map" || !date || !title ? null : getSlug(title, date);

  // Memoized shared data structures
  const { slugToPostMap } = useMemo(() => getPostMappings(posts), [posts]);

  const { treeData, monthKeys, yearKeys } = useMemo(
    () => (posts ? createTreeData(posts) : {}),
    [posts]
  );

  // local state for active and expanded nodes
  const [selectedKey, setSelectedKey] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState([]);

  // collapses all nodes, except the dates needed to show the currne post, if any
  const minimize = useCallback(() => {
    if (view === "map" || !date) {
      setExpandedKeys([]);
      return;
    }

    const [year, month] = date.split("-");
    const { yearKey, monthKey } = getDateNodeKeys(year, month);
    setExpandedKeys([yearKey, monthKey]);
  }, [date, view]);

  // on post change, reset active and expanded nodes
  useEffect(() => {
    if (view === "map" || !slugToPostMap[slug]) {
      setSelectedKey(null);
    }
    setSelectedKey(slug);
    minimize();
  }, [slug, view, minimize, slugToPostMap]);

  // sets all date nodes as expanded
  function expandAll() {
    const allNodesLen = monthKeys.length + yearKeys.length;
    if (expandedKeys.length === allNodesLen) {
      return;
    }
    setExpandedKeys(monthKeys.concat(yearKeys));
  }

  // Action on Node Click - if leaf, navigate to post view.
  // If not a leaf, expand node's children
  const history = useHistory();
  const location = useLocation();

  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf() && selectedKeys.length) {
      const { date, title } = slugToPostMap[selectedKeys[0]];
      history.push(constructViewPath(date, title, location.search));
      closeDrawer(false);
      return;
    }

    setExpandedKeys(
      e.node.props.expanded
        ? expandedKeys.filter(k => k !== e.node.props.eventKey)
        : expandedKeys.concat(e.node.props.eventKey)
    );
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
      <PaddedContainer>
        <TreeView
          treeData={treeData}
          onNodeSelect={onNodeSelect}
          expandedKeys={expandedKeys}
          selectedKeys={[selectedKey]}
          onExpand={onExpand}
        />
      </PaddedContainer>
    </>
  );
}
