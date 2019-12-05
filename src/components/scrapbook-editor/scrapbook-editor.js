import React from "react";
import moment from "moment";
import styled from "styled-components";
import { StateProvider, DefaultState } from "./state";
import MainReducer from "./reducers/index";
import Toolbar from "./toolbar";
import Canvas from "./canvas";

/**
 * Inits an object to be used as the pageData prop for ScrapbookEditor
 *
 * @param {*} data either null to return a base object to work with, or the return of exportPageData()
 */
export function createPageData(data) {
  if (!data) {
    let baseDataCpy = Object.assign({}, DefaultState);
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

  const BaseContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    height: 100%;
    min-width: ${props => (props.readOnly ? "inherit" : "992px")};
  `;
  const ToolbarContainer = styled.div`
    flex: 0 0 25%;
  `;
  const CanvasContainer = styled.div`
    flex: ${props => (props.readOnly ? "100%" : "75%")};
  `;

  return (
    <StateProvider initialState={props.pageData} reducer={MainReducer}>
      <BaseContainer>
        {!props.readOnly && (
          <ToolbarContainer>
            <Toolbar />
          </ToolbarContainer>
        )}
        <CanvasContainer>
          <Canvas />
        </CanvasContainer>
      </BaseContainer>
    </StateProvider>
  );
}
