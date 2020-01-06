import React from "react";
import { ScrapbookEditor } from "../scrapbook-editor/scrapbook-editor";
import { useStateValue } from "./state";

export default function App(props) {
  const [{ data, chosenPage }, dispatch] = useStateValue();
  let editorKey = chosenPage ? JSON.stringify(chosenPage.postData) : "";
  let pageData = chosenPage ? chosenPage.postData : null;
  return (
    <ScrapbookEditor
      showPluginDescription={props.showPluginDescription}
      plugins={props.plugins}
      key={editorKey}
      onSave={onEditorSave}
      pageData={pageData}
    />
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

const onEditorSave = function(pageMetadata, header, blocks) {
  // TODO: dispatch
  console.log("HEADER ----");
  console.log(header);
  console.log(escapeJSONString(JSON.stringify(header)));
  console.log("PAGE METADATA ----");
  console.log(pageMetadata);
  console.log(escapeJSONString(JSON.stringify(pageMetadata)));
  console.log("BLOCKS ----");
  console.log(blocks);
  console.log(escapeJSONString(JSON.stringify(blocks)));
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
