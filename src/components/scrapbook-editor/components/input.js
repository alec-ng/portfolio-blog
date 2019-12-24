import React from "react";

/**
 * Represents an HTML5 input. Requires at least props.onInput to handle any
 * changes, and type to defined data type expected
 */
export default function Input(props) {
  let attributeObj = props.attributes || {};
  return (
    <div className="form-group">
      <label>
        {props.label}
        <input
          type={props.type}
          data-key={props.dataKey}
          className="form-control"
          onInput={props.handleOnInput}
          {...attributeObj}
        />
      </label>
    </div>
  );
}
