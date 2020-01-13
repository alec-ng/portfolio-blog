import React from "react";
import moment from "moment";
import styled from "styled-components";

const datetimeFormat = "YYYY-MM-DD h:mm a";

const FullWidthLabel = styled.label`
  width: 100%;
`;

/**
 * Inputs for page metadata of current selected page
 */
export default function PageMetadata(props) {
  // lastModified is a Firestore Timestamp value
  let lastModified = props.chosenPost.cmsPost.lastModified
    ? moment
        .unix(props.chosenPost.cmsPost.lastModified.seconds)
        .format(datetimeFormat)
    : "N/A";

  return (
    <>
      <div className="form-group">
        <FullWidthLabel>
          Title
          <input
            required
            onChange={props.onChange}
            minLength="3"
            maxLength="50"
            data-val="title"
            pattern="[a-zA-Z0-9\s]+"
            type="text"
            defaultValue={props.chosenPost.cmsPost.post.title}
            className="form-control"
          />
        </FullWidthLabel>
      </div>
      <div className="form-group">
        <FullWidthLabel>
          Date
          <input
            defaultValue={props.chosenPost.cmsPost.post.date}
            onChange={props.onChange}
            required
            className="form-control"
            type="date"
            data-val="date"
          />
        </FullWidthLabel>
      </div>
      <div className="form-group">
        <FullWidthLabel>
          Created
          <input
            style={{ color: "white" }}
            value={props.chosenPost.cmsPost.createdDate}
            readOnly
            className="form-control-plaintext"
            type="text"
          />
        </FullWidthLabel>
      </div>
      <div className="form-group">
        <FullWidthLabel>Last Modified</FullWidthLabel>
        <p style={{ color: "white" }}>{lastModified}</p>
      </div>
    </>
  );
}
