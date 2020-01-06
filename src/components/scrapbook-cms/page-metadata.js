import React from "react";

/**
 * Inputs for page metadata of current selected page
 */
export default function PageMetadata(props) {
  return (
    <>
      <label>
        Title
        <input
          value={props.title}
          className="form-control"
          type="text"
          onChange={props.onChange}
        />
      </label>
      <label>
        Date
        <input
          value={props.date}
          className="form-control"
          type="date"
          onChange={props.onChange}
        />
      </label>
      <label>
        Location
        <input className="form-control" type="text" placeholder="TODO" />
      </label>
      <label>
        Tags
        <input className="form-control" type="text" placeholder="TODO" />
      </label>
    </>
  );
}
