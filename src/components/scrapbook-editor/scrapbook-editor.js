import React, { useState } from "react";
import { StateProvider, DefaultState, useStateValue } from "./state";
import { MainReducer } from "./reducers/index";
import AppContainer from "./app";

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

  return (
    <StateProvider initialState={globalState} reducer={MainReducer}>
      <AppContainer />
    </StateProvider>
  );
}
