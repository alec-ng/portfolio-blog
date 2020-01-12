import React, { useState } from "react";
import { useStateValue } from "../state";
import { ACTION_TYPES } from "../reducers/index";

import PostManager from "./post-manager";
import ChosenPostManager from "./chosen-post-manager";
import Snackbar from "./snackbar";

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
  const [showSnackbar, setShowSnackbar] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  function closeSnackbar() {
    setShowSnackbar(false);
    setSnackbarMessage("");
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

  function onPostCreate(newPost, formActionAfterSuccess) {
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

    onAction("create", {
      id: postId,
      cmsPost: cmsPost
    })
      .then(() => {
        setSnackbarMessage(getSnackbarMessage("create", cmsPost.post.title));
        setShowSnackbar(true);
        formActionAfterSuccess(() => {
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
        setSnackbarMessage(
          getSnackbarMessage("delete", chosenPost.cmsPost.post.title)
        );
        setShowSnackbar(true);
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

  function onChange(property, value) {
    dispatch({
      type: ACTION_TYPES.UPDATE_CURRENT_POST,
      payload: {
        property: property,
        value: value
      }
    });
  }

  function onPostUpdate() {}

  function onPublish() {}

  function onUnpublish() {}

  return (
    <>
      {view === VIEW_POSTS && (
        <>
          <PostManager
            data={data}
            chosenPost={chosenPost}
            onPostCreate={onPostCreate}
            onNodeSelect={onNodeSelect}
          />
        </>
      )}
      {view === VIEW_POSTDATA && (
        <ChosenPostManager
          data={data}
          onUpdate={onPostUpdate}
          chosenPost={chosenPost}
          onDelete={onPostDelete}
          onChange={onChange}
        />
      )}
      {showSnackbar && (
        <Snackbar
          message={snackbarMessage}
          open={showSnackbar}
          handleClose={closeSnackbar}
        />
      )}
    </>
  );
}

function getSnackbarMessage(action, title) {
  switch (action) {
    case "create":
      return `${title} has been created.`;
    case "delete":
      return `${title} was successfully deleted.`;
    case "update":
      return `${title} has been saved.`;
    case "publish":
      return `${title} has been successfully published.`;
    case "unpublish":
      return `${title} has been unpublished.`;
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}
