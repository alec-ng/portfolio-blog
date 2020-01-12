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
 * Contains logic for handling CRUD and state manipulation actions
 * Renders two views: treeview and post data
 * 1. shows all pages loaded in a treeview
 * 2. if a page is chosen, shows its metadata<Menu>
 */
export default function Toolbar(props) {
  const [{ chosenPost, data, onAction }, dispatch] = useStateValue();
  const [view, setView] = useState(chosenPost ? VIEW_POSTDATA : VIEW_POSTS);
  const [showSnackbar, setShowSnackbar] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  // on snackbar timeout or manual X click
  function closeSnackbar() {
    setShowSnackbar(false);
    setSnackbarMessage("");
  }

  // on tree node leaf click
  function onNodeSelect(selectedPostId) {
    dispatch({
      type: ACTION_TYPES.SELECT_POST,
      payload: {
        key: selectedPostId
      }
    });
    setView(VIEW_POSTDATA);
  }

  // on successful create modal form submission
  function onPostCreate(newPost, onCalloutComplete) {
    let cmsPost = {};
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    cmsPost.createdDate = `${yyyy}-${mm}-${dd}`;

    let post = Object.assign({}, newPost);
    let key = `${newPost.date}-${newPost.title}`;
    post.isPublished = false;
    post.key = key;
    cmsPost.post = post;
    cmsPost.postData = {};

    onAction("create", { cmsPost: cmsPost })
      .then(dbId => {
        setSnackbarMessage(getSnackbarMessage("create", cmsPost.post.title));
        setShowSnackbar(true);
        onCalloutComplete(true, () => {
          dispatch({
            type: ACTION_TYPES.CREATE_POST,
            payload: {
              id: dbId,
              cmsPost: cmsPost
            }
          });
          setView(VIEW_POSTDATA);
        });
      })
      .catch(failure => {
        onCalloutComplete(false);
        alert(failure);
      });
  }

  // on confirmed chosen post delete button click
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
        setSnackbarMessage(getSnackbarMessage("error", failure));
      });
  }

  // on page metadata form input change
  function onChange(property, value) {
    dispatch({
      type: ACTION_TYPES.UPDATE_CURRENT_POST,
      payload: {
        property: property,
        value: value
      }
    });
  }

  // on either successful chosen post Save button click or "Back" and save button click
  function onSave(doExit) {
    debugger;
    onAction("update", {
      id: chosenPost.key,
      cmsPost: chosenPost.cmsPost
    })
      .then(() => {
        setSnackbarMessage(
          getSnackbarMessage("update", chosenPost.cmsPost.post.title)
        );
        let type = doExit
          ? ACTION_TYPES.CLOSE_CURRENT_POST
          : ACTION_TYPES.SAVE_CURRENT_POST;
        dispatch({ type: type });
      })
      .catch(failure => {
        setSnackbarMessage(getSnackbarMessage("error", failure));
      });
  }

  // on publish / unpublish button click
  function onPublish(publishStatus) {}

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
          onSave={onSave}
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
    case "error":
      return `Something went wrong - ${title}. Please try again.`;
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}
