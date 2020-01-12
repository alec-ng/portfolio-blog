import React, { useRef, useState } from "react";
import styled from "styled-components";
import PageMetadataForm from "./page-metadata-form";

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

/**
 * Component manager for toolbar view when a post is selected
 */
export default function ChosenPostManager(props) {
  const formRef = useRef(null);
  const isPublished = props.chosenPost.isPublished;
  const existingIdList = Object.keys(props.data).map(id => id.toUpperCase());

  // consolidate information from chosenPost for easier access
  const postMetadata = props.chosenPost.cmsPost.post;
  postMetadata.createdDate = props.chosenPost.cmsPost.createdDate;
  postMetadata.lastModified = props.chosenPost.cmsPost.lastModified;

  function deletePost() {
    if (
      window.confirm(
        `This action will delete your post and all of its contents, regardless of its publish status.
         This cannot be undone. Are you sure you want to delete this post?`
      )
    ) {
      props.onDelete();
    }
  }

  function validatePublished(e) {
    let isValid = validateDraft();
    if (!isValid) {
      return;
    }
    // validate blocks[] is not empty
    // validate header.title is not empty
  }

  // Just validate date/title combo is unique and valid
  // returns true if valid, false otherwise
  function validateDraft(e) {
    if (formRef.current.reportValidity()) {
      let title = formRef.current
        .querySelector("[data-val=title]")
        .value.trim();
      let date = formRef.current.querySelector("[data-val=date]").value;
      let id = `${date}-${title}`;
      let hasDuplicateKey = existingIdList.indexOf(id.toUpperCase()) !== -1;
      return !hasDuplicateKey;
    }
  }

  function goBack() {}

  function save() {}

  function onChange(e) {
    props.onChange(e.currentTarget.dataset.val, e.currentTarget.value);
  }

  return (
    <>
      <BackBtn type="button" className="mb-4" onClick={goBack}>
        &#8592; Back
      </BackBtn>
      <form ref={formRef}>
        <PageMetadataForm postMetadata={postMetadata} onChange={onChange} />
      </form>
      <div className="my-3">
        <FullWidthBtn type="button" className="my-2 btn btn-success">
          Save
        </FullWidthBtn>
        <FullWidthBtn type="button" className="my-2 btn btn-info">
          Publish
        </FullWidthBtn>
        <FullWidthBtn
          type="button"
          onClick={deletePost}
          className="my-2 btn btn-danger"
        >
          Delete
        </FullWidthBtn>
      </div>
    </>
  );
}
