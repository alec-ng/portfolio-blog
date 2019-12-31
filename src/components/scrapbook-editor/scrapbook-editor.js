import React from "react";
import { StateProvider, DefaultState } from "./state";
import { MainReducer } from "./reducers/index";
import AppContainer from "./app";

// CONFIG
/////////////////////////////////////////////////

// Vertical margin used on all canvas block elements during preview/read-only mode
const DEFAULT_VERTICAL_BLOCK_MARGIN = "20px";

/**
 * inits a pageData object to be used as a prop for ScrapbookEditor
 * If data is null, return default
 * Else, merges pageMetadata, header, and block info
 *
 * @param {*} data either null to return a base object to work with, or the return of exportPageData()
 */
export function createInitialState(data) {
  let baseDataCopy = Object.assign({}, DefaultState);
  if (!data) {
    // return back default and set created day to today
    let currDay = new Date();
    let currDayStr = `${currDay.getFullYear()}-${currDay.getMonth() +
      1}-${currDay.getDate()}`;
    baseDataCopy.pageMetadata.createdDate = currDayStr;
  } else {
    baseDataCopy = Object.assign({}, baseDataCopy, data);
  }
  return baseDataCopy;
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
  if (!props.onSave && !props.readOnly) {
    console.error(
      "No onSave prop found - you will not be able to access editor data."
    );
  }

  // add plugins, pageData, and readOnly flag to global state
  let globalState = createInitialState(props.pageData);
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

  // add other props to global state
  globalState.onSave = props.onSave;
  globalState.verticalBlockMargin =
    props.verticalBlockMargin || DEFAULT_VERTICAL_BLOCK_MARGIN;
  globalState.showPluginDescription =
    props.showPluginDescription === false ? false : true;

  // TODO: Header, pageMetadata and blocks properties in pageData

  return (
    <StateProvider initialState={globalState} reducer={MainReducer}>
      <AppContainer />
    </StateProvider>
  );
}
