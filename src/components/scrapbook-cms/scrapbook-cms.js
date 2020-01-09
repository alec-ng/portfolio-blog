import React from "react";
import { StateProvider, DefaultState } from "./state";
import { MainReducer } from "./reducers/index";
import App from "./app";

export function ScrapbookCMS(props) {
  if (!props.onCMSSave) {
    console.error("You must supply a callback for props.onCMSSave.");
  }

  const globalState = Object.assign({}, DefaultState);
  globalState.onSave = props.onCMSSave;
  if (props.data) {
    globalState.data = props.data;
  }
  globalState.originalPostSet = Object.keys(props.data);

  return (
    <StateProvider reducer={MainReducer} initialState={globalState}>
      <App
        showPluginDescription={props.showPluginDescription}
        plugins={props.plugins}
      />
    </StateProvider>
  );
}
