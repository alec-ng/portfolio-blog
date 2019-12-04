import React, { useState } from "react";
import { useStateValue } from "./state";

/**
 * Set of inputs to edit current page metadata
 */
export default function PageMetadata(props) {
  const [{ pageMetadata }, dispatch] = useStateValue();

  function handleOnChange(e) {
    dispatch({
      type: "UPDATE_TITLE",
      payload: {
        inputKey: e.target.dataset.key,
        value: e.target.value
      }
    });
  }

  return (
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">
          Title
          <input
            type="text"
            data-key="title"
            class="form-control"
            onInput={handleOnChange}
          />
        </label>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">
          Subtitle
          <input type="text" class="form-control" />
        </label>
      </div>
    </form>
  );
}
