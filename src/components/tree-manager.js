import React, { useState, useEffect } from "react";

import TreeView from "./rc-tree/treeview";
import useUrlState from "./../hooks/useUrlState";

import { getInitialExpandedKeys, createTreeData } from "./rc-tree/util";
import { useHistory } from "react-router-dom";
import { getKeyFromIndex, getPathnameFromIndex } from "./../util/url-util";

/**
 * treeview whose selected node is synchronized with the URL post-key
 */
export default function TreeManager(props) {
  // Data derived off of the collection index
  // Create data structure needed for rc-tree and auxiliary helper data mappings
  const [treeData, setTreeData] = useState(null);
  const [idToPostMap, setIdToPostMap] = useState(null);
  const [keyToPostMap, setKeyToPostMap] = useState(null);
  useEffect(() => {
    if (!props.postIndex) {
      return;
    }

    setTreeData(createTreeData(props.postIndex).treeData);
    let localIdDataMap = {};
    let localKeyDataMap = {};
    props.postIndex.forEach(post => {
      localIdDataMap[post.postDataId] = post;
      localKeyDataMap[getKeyFromIndex(post)] = post;
    });
    setIdToPostMap(localIdDataMap);
    setKeyToPostMap(localKeyDataMap);
    setExpandedKeys([]);
  }, [props.postIndex]);

  // Data derived off the URL state
  // When chosen post changes, updated selected node in the tree
  // If no nodes are expanded, open all nodes to reveal the selected node
  const [selectedKey, setSelectedKey] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const { collection, postKey, postDate } = useUrlState();
  useEffect(() => {
    // Check for case of initial redirect, where treeData and postKey may refer to different
    // collections
    if (postKey && treeData && keyToPostMap[postKey]) {
      setSelectedKey(keyToPostMap[postKey].postDataId);
      if (!expandedKeys || expandedKeys.length === 0) {
        setExpandedKeys(getInitialExpandedKeys(postDate, treeData));
      }
    }
  }, [postKey, postDate, treeData, expandedKeys, keyToPostMap]);

  // If leaf, make callout to get chosen post
  // If not a leaf, expand and show its children
  const history = useHistory();
  function onNodeSelect(selectedKeys, e) {
    if (e.node.isLeaf() && selectedKeys.length) {
      let newPost = idToPostMap[selectedKeys[0]];
      history.push(getPathnameFromIndex(newPost, collection));
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
      {treeData && (
        <TreeView
          treeData={treeData}
          onNodeSelect={onNodeSelect}
          expandedKeys={expandedKeys}
          selectedKeys={[selectedKey]}
          onExpand={onExpand}
        />
      )}
    </>
  );
}
