import React from "react";
import { ScrapbookEditor } from "../scrapbook-editor/scrapbook-editor";
import { useStateValue } from "./state";
import { ACTION_TYPES } from "./reducers/index";
import styled from "styled-components";
import SidebarDrawer from "./components/sidebar-drawer";
import Toolbar from "./components/toolbar";
import Header from "./components/header";

export default function App(props) {
  const [{ chosenPost }, dispatch] = useStateValue();

  function onEditorChange(header, blocks) {
    // This works
    dispatch({
      type: ACTION_TYPES.UPDATE_CURRENT_POSTDATA,
      payload: {
        header: header,
        blocks: blocks
      }
    });
  }

  return (
    <>
      <Header>
        <SidebarDrawer>
          <Toolbar />
        </SidebarDrawer>
      </Header>
      {chosenPost != null ? (
        <ScrapbookEditor
          showPluginDescription={props.showPluginDescription}
          plugins={props.plugins}
          key={chosenPost}
          onChange={onEditorChange}
          pageData={chosenPost.postData}
        />
      ) : (
        <EmptyEditorContainer>
          <h1 className="text-muted">
            In the toolbar, select or create a post to modify its contents here.
          </h1>
        </EmptyEditorContainer>
      )}
    </>
  );
}

const EmptyEditorContainer = styled.div`
  display: flex;
  text-align: center;
  height: 80vh;
  justify-content: center;
  flex-direction: column;
`;

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
