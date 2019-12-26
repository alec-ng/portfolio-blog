import React from "react";

/**
 * Represents an HTML5 select element
 */
export default function Select(props) {
  let attributes = props.attributes ? Object.assign({}, props.attributes) : {};
  let multiSelectionEnabled = attributes.multiple === true;
  delete attributes.multiple;

  return (
    <div className="form-group">
      <label style={{ width: "100%" }}>
        {props.label}
        {multiSelectionEnabled ? (
          <select
            className="form-control"
            onChange={props.onChange}
            multiple
            {...props.attributes}
          >
            {props.options}
          </select>
        ) : (
          <select
            className="form-control"
            onChange={props.onChange}
            {...props.attributes}
          >
            {props.options}
          </select>
        )}
      </label>
    </div>
  );
}
