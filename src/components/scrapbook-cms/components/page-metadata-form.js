import React from "react";

/**
 * Inputs for page metadata of current selected page
 */
export default function PageMetadata(props) {
  return (
    <>
      <div className="form-group">
        <label style={{ width: "100%" }}>
          Title
          <input
            required
            onChange={props.onChange}
            minLength="3"
            maxLength="50"
            data-val="title"
            pattern="[a-zA-Z0-9\s]+"
            type="text"
            defaultValue={props.postMetadata.title}
            className="form-control"
          />
        </label>
      </div>
      <div className="form-group">
        <label style={{ width: "100%" }}>
          Date
          <input
            defaultValue={props.postMetadata.date}
            onChange={props.onChange}
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
            value={props.postMetadata.createdDate}
            readOnly
            className="form-control-plaintext"
            type="text"
          />
        </label>
      </div>
      <div className="form-group">
        <label style={{ width: "100%" }}>
          Last Modified
          {props.postMetadata.lastModified ? (
            <input
              style={{ color: "white" }}
              value={props.postMetadata.lastModified}
              readOnly
              className="form-control-plaintext"
              type="datetime-local"
            />
          ) : (
            <p style={{ color: "white" }}>N/A</p>
          )}
        </label>
      </div>
    </>
  );
}
