import React from "react";

/**
 * Represents an HTML5 input. Requires at least props.onInput to handle any
 * changes, and type to defined data type expected
 */
export default function Input(props) {
  return (
    <div className="form-group">
      <label>
        {props.label}
        <BaseInputElement {...props} />
      </label>
    </div>
  );
}

function BaseInputElement(props) {
  let isCheckedCheckbox = false;
  let attributeObj = props.attributes
    ? Object.assign({}, props.attributes)
    : {};
  if (props.type === "checkbox" && attributeObj.checked) {
    isCheckedCheckbox = true;
  }
  delete attributeObj.checked;

  return (
    <>
      {isCheckedCheckbox ? (
        <input
          type={props.type}
          data-key={props.dataKey}
          className="form-control"
          onInput={props.handleOnInput}
          checked
          {...attributeObj}
        />
      ) : (
        <input
          type={props.type}
          data-key={props.dataKey}
          className="form-control"
          onInput={props.handleOnInput}
          {...attributeObj}
        />
      )}
    </>
  );
}
