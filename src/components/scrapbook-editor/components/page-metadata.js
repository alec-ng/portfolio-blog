import React from "react";
import { useStateValue } from "../state";
import { ACTION_TYPES } from "./../reducers/index";

export function PageMetadata(props) {
  const [{ pageMetadata }, dispatch] = useStateValue();

  return (
    <>
      <h1>{pageMetadata.title}</h1>
      <h2>{pageMetadata.subTitle}</h2>
      <h3>{pageMetadata.displayDate}</h3>
      <hr />
    </>
  );
}

/**
 * Set of inputs to edit current page metadata
 */
export function PageMetadataControls(props) {
  const [{ pageMetadata }, dispatch] = useStateValue();

  function handleOnChange(e) {
    dispatch({
      type: ACTION_TYPES.UPDATE_INPUT,
      payload: {
        inputKey: e.target.dataset.key,
        value: e.target.value
      }
    });
  }

  return (
    <form>
      <div className="form-group">
        <label>
          Title
          <input
            type="text"
            data-key="title"
            className="form-control"
            onInput={handleOnChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Subtitle
          <input
            type="text"
            className="form-control"
            data-key="subTitle"
            onInput={handleOnChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Display Date
          <input
            type="date"
            className="form-control"
            data-key="displayDate"
            onInput={handleOnChange}
          />
        </label>
      </div>
    </form>
  );
}
