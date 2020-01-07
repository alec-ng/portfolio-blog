import React from "react";
import { ScrapbookEditor } from "../scrapbook-editor/scrapbook-editor";
import { useStateValue } from "./state";

import Toolbar from "./components/toolbar";

export default function App(props) {
  const [{ data, chosenPage }, dispatch] = useStateValue();
  let editorKey = chosenPage ? JSON.stringify(chosenPage.postData) : "";
  let pageData = chosenPage ? chosenPage.postData : null;
  return (
    <div>
      <Toolbar />
      <ScrapbookEditor
        showPluginDescription={props.showPluginDescription}
        plugins={props.plugins}
        key={editorKey}
        onSave={onEditorSave}
        onChange={onEditorChange}
        pageData={pageData}
      />
    </div>
  );

  // <AppContainer>
  //   <SidebarContainer>
  //     <Sidebar
  //       onPostSelect={}
  //       onPageMetadataChange={}
  //       onPostCreate={}
  //       onPostDelete={}
  //       postData={}
  //       chosenPost={} />
  //   </SidebarContainer>
  //   <EditorContainer>
  //     <ScrapbookEditor
  //       showPluginDescription={props.scrapbookProps.showPluginDescription}
  //       plugins={props.scrapbookProps.plugins}
  //       key={JSON.stringify(chosenPage.postData)}
  //       onSave={onPostDataSave}
  //       pageData={chosenPage.postData} />
  //   </EditorContainer>
  // </AppContainer>
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
