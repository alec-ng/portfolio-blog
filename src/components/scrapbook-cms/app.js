import React from "react";
import { ScrapbookEditor } from "../scrapbook-editor/scrapbook-editor";
import { useStateValue } from "./state";

import SidebarDrawer from "./components/sidebar-drawer";
import Toolbar from "./components/toolbar";
import Header from "./components/header";

export default function App(props) {
  const [{ data, chosenPage }, dispatch] = useStateValue();
  let editorKey = chosenPage ? JSON.stringify(chosenPage.postData) : "";
  let pageData = chosenPage ? chosenPage.postData : null;

  return (
    <>
      <Header>
        <SidebarDrawer>
          <Toolbar />
        </SidebarDrawer>
      </Header>
      {chosenPage != null ? (
        <ScrapbookEditor
          showPluginDescription={props.showPluginDescription}
          plugins={props.plugins}
          key={editorKey}
          onSave={onEditorSave}
          onChange={onEditorChange}
          pageData={pageData}
        />
      ) : (
        <h1>
          {[...new Array(100)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </h1>
      )}
    </>
  );
}

const onEditorChange = function(header, blocks) {
  // This works
};

const onEditorSave = function(header, blocks) {
  // This works
};

const escapeJSONString = function(str) {
  return str
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
};
