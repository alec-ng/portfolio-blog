import React, { useState } from "react";
import { useStateValue } from "../state";
import { ACTION_TYPES } from "../reducers/index";

import PostManager from "./post-manager";
import PageMetadata from "./page-metadata";

const VIEW_POSTS = "posts";
const VIEW_POSTDATA = "postData";

/**
 * State manager for sidebar functionality
 * Renders two views: treeview and post data
 * 1. shows all pages loaded in a treeview
 * 2. if a page is chosen, shows its metadata<Menu>
 */
export default function Toolbar(props) {
  const [{ chosenPost, data, onAction }, dispatch] = useStateValue();
  const [view, setView] = useState(chosenPost ? VIEW_POSTDATA : VIEW_POSTS);

  function onNodeSelect(selectedPostId) {
    dispatch({
      type: ACTION_TYPES.SELECT_POST,
      payload: {
        key: selectedPostId
      }
    });
    setView(VIEW_POSTDATA);
  }

  function onPostCreate(newPost, onSuccess) {
    let cmsPost = {};
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    cmsPost.createdDate = `${yyyy}-${mm}-${dd}`;

    let post = Object.assign({}, newPost);
    post.isPublished = false;
    cmsPost.post = post;

    let postId = `${newPost.date}-${newPost.title}`;

    // TODO: freeze everything until the promise toggles it again
    onAction("create", {
      id: postId,
      cmsPost: cmsPost
    })
      .then(() => {
        onSuccess(() => {
          dispatch({
            type: ACTION_TYPES.CREATE_POST,
            payload: {
              id: postId,
              cmsPost: cmsPost
            }
          });
          setView(VIEW_POSTDATA);
        });
      })
      .catch(failure => {
        alert(failure);
      });
  }

  function onPostDelete() {
    onAction("delete", { id: chosenPost.key })
      .then(() => {
        setView(VIEW_POSTS);
        dispatch({
          type: ACTION_TYPES.DELETE_POST,
          payload: {
            id: chosenPost.key
          }
        });
      })
      .catch(failure => {
        alert(failure);
      });
  }

  function onPostUpdate(e) {}

  return (
    <>
      {view === VIEW_POSTS && (
        <>
          <AllPostsView
            data={data}
            chosenPost={chosenPost}
            onPostCreate={onPostCreate}
            onNodeSelect={onNodeSelect}
          />
        </>
      )}

      {view === VIEW_POSTDATA && (
        <ChosenPostView
          data={data}
          onUpdate={onPostUpdate}
          chosenPost={chosenPost}
          onDelete={onPostDelete}
        />
      )}
    </>
  );
}

function AllPostsView(props) {
  return (
    <PostManager
      data={props.data}
      chosenPost={props.chosenPost}
      onPostCreate={props.onPostCreate}
      onNodeSelect={props.onNodeSelect}
    />
  );
}

function ChosenPostView(props) {
  // extract all Ids to check for dupes
  const existingIdList = Object.keys(props.data);

  // if a page is chosen, grab its post and its created date / last modified
  const chosenPostMetadata = props.chosenPost.cmsPost.post;
  chosenPostMetadata.createdDate = props.chosenPost.cmsPost.createdDate;
  chosenPostMetadata.lastModified = props.chosenPost.cmsPost.lastModified;

  return (
    <PageMetadata
      chosenPost={chosenPostMetadata}
      existingIdList={existingIdList}
      onDelete={props.onDelete}
      onUpdate={props.onUpdate}
    />
  );
}
