import React from "react";
import { useStateValue } from "../state";
import { ACTION_TYPES } from "./../reducers/index";
import Input from "./../components/input";

export function PageMetadata(props) {
  const [{ pageMetadata }] = useStateValue();
  const metadataExists =
    pageMetadata.title ||
    pageMetadata.subTitle ||
    pageMetadata.displayDate1 ||
    pageMetadata.displayDate2;

  let displayDate;
  if (pageMetadata.displayDate1 && pageMetadata.displayDate2) {
    displayDate = `${pageMetadata.displayDate1.replace(
      "-",
      "/"
    )}  - ${pageMetadata.displayDate2.replace("-", "/")}`;
  } else {
    displayDate = pageMetadata.displayDate1 || pageMetadata.displayDate2;
  }

  return (
    <div className="text-center mx-3 my-5">
      {metadataExists ? (
        <>
          {pageMetadata.title && (
            <h1 className="pb-3 pt-1 display-2">{pageMetadata.title}</h1>
          )}
          {pageMetadata.subTitle && (
            <h3 className="py-1">{pageMetadata.subTitle}</h3>
          )}
          {displayDate && <h4 className="py-1">{displayDate}</h4>}
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
  const [, dispatch] = useStateValue();

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
      <div className="form-row">
        <div className="col-md-6">
          <Input
            label="Start Date"
            type="date"
            dataKey="displayDate1"
            handleOnChange={handleOnChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            label="End Date"
            type="date"
            dataKey="displayDate2"
            handleOnChange={handleOnChange}
          />
        </div>
      </div>
    </form>
  );
}
