import React from "react";
import moment from "moment";
import styled from "styled-components";
import { StateProvider } from "./context";
import MainReducer from "./reducers/index";

const BASE_PAGE_DATA = {
  pageMetadata: {
    title: undefined,
    createdDate: null,
    lastModified: null,
    tags: [],
    location: undefined
  },
  blocks: []
};

// SAMPLE DATA
////////////////////////////////////////////////////////////////////
// const BASE_EDITOR_STATE = {
//   title: 'Title',
//   createdDate: 'YYYY-MM-DDTHH:mm:ss. sssZ',
//   lastModified: 'YYYY-MM-DDTHH:mm:ss. sssZ',
//   tags: ['tag-1', 'tag-2'],
//   location: 'location',
//   blocks: [
//     {
// blockType: "blockType",
// baseProps: [
//   {
//     name: 'myName',
//     label: 'My Label',
//     value: true
//   }
// ],
// variation: "variation2",
// variationProps: [
//   {
//     name: 'myName',
//     label: 'My Label',
//     value: test
//   }
// ]
//     }
//   ]
// }

/**
 * Inits an object to be used as the pageData prop for ScrapbookEditor
 *
 * @param {*} data either null to return a base object to work with, or the return of exportPageData()
 */
export function createPageData(data) {
  if (!data) {
    let baseDataCpy = Object.assign({}, BASE_PAGE_DATA);
    baseDataCpy.pageMetadata.createdDate = moment();
    return baseDataCpy;
  } else {
    // Any processing to do here?
    return data;
  }
}

/**
 *
 * @param plugins list of render props of blocks to be used by the editor and page
 * @param pageData JSON representation of page and all child blocks
 * @param readOnly if true, sidebar does not render and blocks cannot be edited
 * @param onChange cb that receives the new editor data as an arugment whenever a block has been modified, added or deleted
 */
export function ScrapbookEditor(props) {
  // check props
  if (!props.plugins || props.plugins.length < 1) {
    console.error("You must supply at least one plugin through props.plugins.");
  }
  if (!props.pageData) {
    console.error(
      "You must supply page data to load. Try using createPageData()."
    );
  }
  if (!props.onChange) {
    console.warn(
      "No onChange prop found - you will not be able to see up to date page data."
    );
  }

  const initialState = {};

  const EditorContainer = props.readOnly
    ? styled.div`
        max-width: 992px;
        margin-left: auto;
        margin-right: auto;
      `
    : styled.div`
        margin-left: auto;
        margin-right: auto;
      `;

  return (
    <StateProvider initialState={initialState} reducer={MainReducer}>
      <EditorContainer className="row">
        <h1>Test Editor</h1>
        {/* toolbar */}
        {/* Page metadata */}
        {/* Plugin List */}
        {/* Block metadata */}
        {/* Canvas */}
        {/* [plugins] */}
      </EditorContainer>
    </StateProvider>
  );
}
