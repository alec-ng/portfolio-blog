import React from "react";
import { StateProvider, DefaultState } from "./state";
import { MainReducer } from "./reducers/index";

import styled from "styled-components";
import Toolbar from "./toolbar";
import Canvas from "./canvas";
import PreviewButton from "./components/preview-button";

/**
 * Inits an object to be used as the pageData prop for ScrapbookEditor
 *
 * @param {*} data either null to return a base object to work with, or the return of exportPageData()
 */
export function createPageData(data) {
  if (!data) {
    let baseDataCpy = Object.assign({}, DefaultState);
    let currDay = new Date();
    baseDataCpy.pageMetadata.createdDate = `${currDay.getFullYear()}-${currDay.getMonth() +
      1}-${currDay.getDate()}`;
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
 * @param onSave executes a cb that receives the new editor data as an arugment
 */
export function ScrapbookEditor(props) {
  if (!props.plugins || props.plugins.length < 1) {
    console.error("You must supply at least one plugin through props.plugins.");
  }
  if (!props.pageData) {
    console.error(
      "You must supply page data to load. Try using createPageData()."
    );
  }
  if (!props.onSave) {
    console.warn(
      "No onSave prop found - you will not be able to access editor data."
    );
  }

  // add plugins and readOnly flag to global state
  let globalState = Object.assign({}, props.pageData);
  globalState.plugins = props.plugins;
  if (typeof props.readOnly !== "undefined") {
    globalState.readOnly = props.readOnly;
  }

  // add a mapping of names => plugins to state
  let pluginMap = {};
  globalState.plugins.forEach(plugin => {
    pluginMap[plugin.name] = plugin;
  });
  globalState.pluginMap = pluginMap;

  // Add save cb to global state
  globalState.onSave = props.onSave;

  const BaseContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    height: 100%;
    min-width: ${props =>
      !props.readOnly && !props.inPreviewMode ? "inherit" : "992px"};
  `;
  const ToolbarContainer = styled.div`
    flex: 0 0 25%;
    overflow-y: auto;
  `;
  const CanvasContainer = styled.div`
    overflow-y: auto;
    flex: ${props =>
      !props.readOnly && !props.inPreviewMode ? "100%" : "75%"};
  `;

  return (
    <StateProvider initialState={globalState} reducer={MainReducer}>
      <BaseContainer
        readOnly={globalState.readOnly}
        inPreviewMode={globalState.inPreviewMode}
      >
        {!globalState.inPreviewMode && !globalState.readOnly && (
          <ToolbarContainer>
            <Toolbar />
          </ToolbarContainer>
        )}
        <CanvasContainer
          readOnly={globalState.readOnly}
          inPreviewMode={globalState.inPreviewMode}
        >
          <Canvas />
        </CanvasContainer>
        {/* {globalState.inPreviewMode && (<PreviewButton />)} */}
      </BaseContainer>
    </StateProvider>
  );
}
