import React from "react";
import { useStateValue } from "../state";
import { ACTION_TYPES } from "./../reducers/index";
import Input from "./../components/input";

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

  function handleOnInput(e) {
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
      <Input
        label="Title"
        type="text"
        dataKey="title"
        handleOnInput={handleOnInput}
      />
      <Input
        label="Subtitle"
        type="text"
        dataKey="subTitle"
        handleOnInput={handleOnInput}
      />
      <Input
        label="Display Date"
        type="date"
        dataKey="displayDate"
        handleOnInput={handleOnInput}
      />
    </form>
  );
}
