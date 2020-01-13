import React, { useRef, useState } from "react";
import styled from "styled-components";
import PageMetadataForm from "./page-metadata-form";
import { ValidationDialogue, ValidationMessages } from "./validation-dialogue";
import isEqual from "react-fast-compare";
import { generateKeyFromPost } from "./../post-util";

const BackBtn = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.75);
  color: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
  padding: 2px 10px;
`;

const FullWidthBtn = styled.button`
  width: 100%;
`;

const Spinner = (
  <div
    className="spinner-border spinner-border-sm"
    role="status"
    style={{
      marginBottom: "2px",
      marginRight: "5px"
    }}
  >
    <span className="sr-only">Loading...</span>
  </div>
);

/**
 * Component manager for toolbar view when a post is selected
 */
export default function ChosenPostManager(props) {
  const [validationErrors, setValidationErrors] = useState([]);
  const [validationDialogueOpen, setValidationDialogueOpen] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [actionPending, setActionPending] = useState("");

  const hasChanged = !isEqual(
    props.data[props.chosenPost.key],
    props.chosenPost.cmsPost
  );
  const saveButtonAttribues = hasChanged ? {} : { disabled: true };

  const formRef = useRef(null);
  const isPublished = props.chosenPost.cmsPost.post.isPublished;
  const existingIdList = Object.keys(props.data).map(id =>
    props.data[id].post.key.toUpperCase()
  );

  // consolidate information from cms-post and post for easier access
  const postMetadata = Object.assign({}, props.chosenPost.cmsPost.post);
  postMetadata.createdDate = props.chosenPost.cmsPost.createdDate;
  postMetadata.lastModified = props.chosenPost.cmsPost.lastModified;

  const closeValidationDialog = () => {
    setValidationDialogueOpen(false);
    setValidationErrors([]);
  };

  function deletePost() {
    if (
      window.confirm(
        "This action will delete your post and all of its contents, regardless of its publish status." +
          " Are you sure you want to delete this post? THIS CANNOT BE UNDONE."
      )
    ) {
      setFormDisabled(true);
      setActionPending("delete");
      props.onDelete(() => {
        setFormDisabled(false);
        setActionPending("");
      });
    }
  }

  function validate(isPublished) {
    function returnValidStatus(validationErrors) {
      if (validationErrors.length > 0) {
        setValidationErrors(validationErrors);
        setValidationDialogueOpen(true);
        return false;
      } else {
        return true;
      }
    }
    // html5 form input validation
    let isValid = formRef.current.reportValidity();
    if (!isValid) {
      return;
    }

    let validationErrors = [];

    // ensure date/tite combo is unique and valid
    let key = generateKeyFromPost(props.chosenPost.cmsPost.post);
    let hasDuplicateKey = existingIdList.indexOf(key.toUpperCase()) !== -1;
    if (hasDuplicateKey) {
      validationErrors.push(ValidationMessages.UNIQUE_KEY);
    }

    // terminate early for drafts
    if (!isPublished) {
      return returnValidStatus(validationErrors);
    }

    // validate blocks[] is not empty
    let isContentPresent = props.chosenPost.cmsPost.pageData.blocks.length > 0;
    if (!isContentPresent) {
      validationErrors.push(ValidationMessages.UNIQUE_KEY);
    }

    // validate header.title is not empty
    let isHeaderPresent =
      props.chosenPost.cmsPost.pageData.header.title.length > 0;
    if (!isHeaderPresent) {
      validationErrors.push(ValidationMessages.EMPTY_HEADER);
    }

    return returnValidStatus(validationErrors);
  }

  function goBack() {}

  function save() {
    if (!validate(isPublished)) {
      return;
    }
    setFormDisabled(true);
    setActionPending("save");
    let doExit = false;
    props.onSave(doExit, () => {
      setFormDisabled(false);
      setActionPending("");
    });
  }

  function onChange(e) {
    props.onChange(e.currentTarget.dataset.val, e.currentTarget.value);
  }

  function togglePublish() {
    let newPublishStatus = !isPublished;
    if (!validate(newPublishStatus)) {
      return;
    }
    let confirmationMsg = newPublishStatus
      ? "You are about to publish this post and any changes you have made this " +
        "session. The post will be visible to the general public. Continue?"
      : "You are about to unpublish this post, as well as save any changes you have " +
        "made this session. The general public will not be able to see this post anymore. Continue?";

    if (window.confirm(confirmationMsg)) {
      setFormDisabled(true);
      setActionPending("publish");
      props.onPublish(newPublishStatus, () => {
        setFormDisabled(false);
        setActionPending("");
      });
    }

    alert("todo!");
  }

  return (
    <>
      <ValidationDialogue
        open={validationDialogueOpen}
        handleClose={closeValidationDialog}
        errors={validationErrors}
      />

      <BackBtn type="button" className="mb-4" onClick={goBack}>
        &#8592; Back
      </BackBtn>
      <form ref={formRef}>
        <fieldset disabled={formDisabled}>
          <PageMetadataForm postMetadata={postMetadata} onChange={onChange} />
          <div className="my-3">
            <FullWidthBtn
              type="button"
              className="my-2 btn btn-success"
              onClick={save}
              {...saveButtonAttribues}
            >
              {actionPending === "save" && Spinner}
              Save
            </FullWidthBtn>
            <FullWidthBtn
              type="button"
              className="my-2 btn btn-info"
              onClick={togglePublish}
            >
              {actionPending === "publish" && Spinner}
              {isPublished ? "Unpublish" : "Publish"}
            </FullWidthBtn>
            <FullWidthBtn
              type="button"
              onClick={deletePost}
              className="my-2 btn btn-danger"
            >
              {actionPending === "delete" && Spinner}
              Delete
            </FullWidthBtn>
          </div>
        </fieldset>
      </form>
    </>
  );
}
