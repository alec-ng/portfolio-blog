import React from "react";
import { useStateValue } from "../state";
import { ACTION_TYPES } from "./../reducers/index";
import Input from "./../components/input";

export function PageMetadata(props) {
  const [{ pageMetadata }, dispatch] = useStateValue();
  const metadataExists =
    pageMetadata.title || pageMetadata.subTitle || pageMetadata.displayDate;

  return (
    <div className="text-center mx-3 my-5">
      {metadataExists ? (
        <>
          <h1 className="py-1">{pageMetadata.title}</h1>
          <h4 className="py-1">{pageMetadata.subTitle}</h4>
          <h5 className="py-1">{pageMetadata.displayDate}</h5>
        </>
      ) : (
        <h1>Page metadata is shown here</h1>
      )}
    </div>
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
      <Input
        label="Title"
        type="text"
        dataKey="title"
        handleOnChange={handleOnChange}
      />
      <Input
        label="Subtitle"
        type="text"
        dataKey="subTitle"
        handleOnChange={handleOnChange}
      />
      <Input
        label="Display Date"
        type="date"
        dataKey="displayDate"
        handleOnChange={handleOnChange}
      />
    </form>
  );
}
