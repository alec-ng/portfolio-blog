import React from "react";
import { StateProvider, DefaultState } from "./state";
import { MainReducer } from "./reducers/index";
import App from "./app";

export function ScrapbookCMS(props) {
  if (!props.onAction) {
    console.error("You must supply a promise for props.onAction.");
  }
  if (!props.plugins || props.plugins.length < 1) {
    console.error(
      "You must supply at least one plugin to use with Scrapbook-Editor."
    );
  }

  const globalState = Object.assign({}, DefaultState);
  globalState.onAction = props.onAction;
  if (props.data) {
    globalState.data = props.data;
  }

  return (
    <StateProvider reducer={MainReducer} initialState={globalState}>
      <App
        showPluginDescription={props.showPluginDescription}
        plugins={props.plugins}
      />
    </StateProvider>
  );
}
