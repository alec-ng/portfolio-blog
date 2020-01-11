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
  const [{ chosenPost, data, onAction }, dispatch] = useStateValue();

  const chosenPostMetadata = chosenPost ? chosenPost.post : null;

  const [view, setView] = useState(chosenPost ? VIEW_POSTDATA : VIEW_POSTS);

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
        key: selectedPostId
      }
    });
    setView(VIEW_POSTDATA);
  }

  function onPostCreate(newPost) {
    let dbPost = Object.assign({}, newPost);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    dbPost.createdDate = `${yyyy}-${mm}-${dd}`;
    let postId = `${dbPost.date}-${dbPost.title}`;

    onAction("create", {
      id: postId,
      post: dbPost
    })
      .then(value => {
        dispatch({
          type: ACTION_TYPES.CREATE_POST,
          payload: {
            id: postId,
            post: dbPost
          }
        });
        setView(VIEW_POSTDATA);
      })
      .catch(failure => {
        alert(failure);
      });

    // TODO: freeze everything until the promise toggles it again
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
