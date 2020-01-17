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
  // lastModified -- expect one of
  // - 1. Firestore timestamp value (loaded from db),
  // - 2. Moment object (saved at some point during this session),
  // - 3. null (created but not edited at all)

  let lastModified = props.chosenPost.cmsPost.lastModified;
  let lastModifiedStr = !lastModified
    ? "N/A"
    : moment.isMoment(lastModified)
    ? lastModified.format(datetimeFormat)
    : moment.unix(lastModified.seconds).format(datetimeFormat);

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
        <p style={{ color: "white" }}>{lastModifiedStr}</p>
      </div>
    </>
  );
}
