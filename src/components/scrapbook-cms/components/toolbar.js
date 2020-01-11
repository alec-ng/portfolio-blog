import React, { useState } from "react";
import { useStateValue } from "../state";
import { ACTION_TYPES } from "../reducers/index";

import PostManager from "./post-manager";

import ButtonGroup from "./button-group";
import PageMetadata from "./page-metadata";

const VIEW_POSTS = "posts";
const VIEW_POSTDATA = "postData";

const buttonGroupData = [
  {
    key: VIEW_POSTS,
    label: "View All Posts"
  },
  {
    key: VIEW_POSTDATA,
    label: "Selected Post"
  }
];

/**
 * State manager for sidebar functionality
 * Renders two views: treeview and post data
 * 1. shows all pages loaded in a treeview
 * 2. if a page is chosen, shows its metadata<Menu>
 */
export default function Toolbar(props) {
  const [{ chosenPost, data, changeList }, dispatch] = useStateValue();

  const chosenPostMetadata = chosenPost ? data[chosenPost].post : null;

  const [view, setView] = useState(VIEW_POSTS);

  let posts = [];
  Object.keys(data).forEach(key => {
    posts.push(data[key].post);
  });
  const existingIdList = posts.map(post => post.id);

  function ButtonNavGroup(props) {
    return (
      <ButtonGroup
        buttons={buttonGroupData}
        activeKey={view}
        onClick={props.onClick}
      />
    );
  }

  function onNodeSelect(selectedPostId) {
    dispatch({
      type: ACTION_TYPES.SELECT_POST,
      payload: {
        id: selectedPostId
      }
    });
    setView(VIEW_POSTDATA);
  }

  function onPostCreate(newPost) {
    dispatch({
      type: ACTION_TYPES.CREATE_POST,
      payload: newPost
    });
    setView(VIEW_POSTDATA);
  }

  function onPostDelete(e) {
    // "Are you sure" confirmation?
    // on "yes" - mutateHistory()
  }

  function toggleView(e) {
    setView(e.currentTarget.dataset.buttonkey);
  }

  return (
    <>
      {view === VIEW_POSTS && (
        <>
          <PostManager
            buttonNavGroup={ButtonNavGroup}
            navOnClick={toggleView}
            data={data}
            chosenPost={chosenPost}
            onPostCreate={onPostCreate}
            onNodeSelect={onNodeSelect}
          />
        </>
      )}

      {view === VIEW_POSTDATA && (
        <PageMetadata
          chosenPost={chosenPostMetadata}
          existingIdList={existingIdList}
          onDelete={onPostDelete}
        />
      )}
    </>
  );
}
