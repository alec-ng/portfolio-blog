import React from "react";
import { StateProvider, DefaultState } from "./state";
import { MainReducer } from "./reducers/index";
import uuidv1 from "uuid/v1";
import AppContainer from "./app";

// CONFIG
/////////////////////////////////////////////////

// Vertical margin used on all canvas block elements during preview/read-only mode
const DEFAULT_VERTICAL_BLOCK_MARGIN = "20px";

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
  if (!props.onSave && !props.onChange && !props.readOnly) {
    console.error(
      `If rendering in edit mode, you must supply at leaset one of onSave or onChange in order
       to access editor data.`
    );
  }

  // add plugins, pageData, and readOnly flag to global state
  let globalState = Object.assign({}, DefaultState);
  if (props.pageData) {
    let localPageData = JSON.parse(JSON.stringify(props.pageData));
    localPageData.blocks.forEach(block => {
      block.uuid = uuidv1();
      block.isFocused = false;
    });
    globalState = Object.assign({}, globalState, localPageData);
  }
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
  globalState.onChange = props.onChange;
  globalState.onSave = props.onSave;
  globalState.verticalBlockMargin =
    props.verticalBlockMargin || DEFAULT_VERTICAL_BLOCK_MARGIN;
  globalState.showPluginDescription =
    props.showPluginDescription === false ? false : true;

  return (
    <StateProvider initialState={globalState} reducer={MainReducer}>
      <AppContainer />
    </StateProvider>
  );
}
