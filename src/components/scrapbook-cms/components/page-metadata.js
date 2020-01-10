import React, { useRef, useState } from "react";

/**
 * Inputs for page metadata of current selected page
 */
export default function PageMetadata(props) {
  const [showKeyError, setShowKeyError] = useState(false);
  const formRef = useRef(null);
  const idList = props.existingIdList.map(id => id.toUpperCase());

  function deletePost() {
    if (
      window.confirm(
        "Are you sure you want to delete this post and its contents?"
      )
    ) {
      props.onDelete();
    }
  }

  function validateAndExit(e) {
    if (formRef.current.reportValidity()) {
      // check if date/title combination is unique
      let title = formRef.current
        .querySelector("[data-val=title]")
        .value.trim();
      let date = formRef.current.querySelector("[data-val=date]").value;
      let id = `${date}-${title}`;
      let hasDuplicateKey = idList.indexOf(id.toUpperCase()) !== -1;
      setShowKeyError(hasDuplicateKey);
      if (hasDuplicateKey) {
        return;
      }

      let newData = {};
      formRef.current.querySelectorAll("input").forEach(input => {
        newData[input.dataset.val] = input.value;
        input.value = "";
      });
      props.onExit(newData);
    }
  }

  return (
    <>
      <form ref={formRef}>
        <div className="form-group">
          <label style={{ width: "100%" }}>
            Title
            <input
              required
              minLength="3"
              maxLength="50"
              data-val="title"
              pattern="[a-zA-Z0-9\s]+"
              type="text"
              defaultValue={props.chosenPost.title}
              className="form-control"
            />
          </label>
        </div>
        <div className="form-group">
          <label style={{ width: "100%" }}>
            Date
            <input
              defaultValue={props.chosenPost.date}
              required
              className="form-control"
              type="date"
            />
          </label>
        </div>
        <div className="form-group">
          <label style={{ width: "100%" }}>
            Created
            <input
              style={{ color: "white" }}
              value={props.chosenPost.createdDate}
              readOnly
              className="form-control-plaintext"
              type="text"
            />
          </label>
        </div>
        <div className="form-group">
          <label style={{ width: "100%" }}>
            Last Modified
            {props.chosenPost.lastModified ? (
              <input
                style={{ color: "white" }}
                value={props.chosenPost.lastModified}
                readOnly
                className="form-control-plaintext"
                type="datetime-local"
              />
            ) : (
              <p style={{ color: "white" }}>N/A</p>
            )}
          </label>
        </div>
      </form>
      <div className="my-3">
        <button type="button" className="btn btn-info">
          Publish
        </button>
        <button type="button" onClick={deletePost} className="btn btn-danger">
          Delete Post
        </button>
      </div>
    </>
  );
}
