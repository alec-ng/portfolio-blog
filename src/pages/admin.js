import React, { useState } from "react";
import SignoutButton from "../components/signout-button";
import { withAuthorization } from "../components/session";
import {
  ScrapbookEditor,
  createPageData
} from "../components/scrapbook-editor/scrapbook-editor";

/**
 * Page level component for admin section
 */
const Admin = function(props) {
  const [editorData, setEditorData] = useState(createPageData());
  const plugins = ["test-plugin"];

  function onEditorChange(pageData) {
    setEditorData(pageData);
  }

  return (
    <div className="container-fluid">
      <ScrapbookEditor
        pageData={editorData}
        onChange={onEditorChange}
        plugins={plugins}
      />
      <SignoutButton />
    </div>
  );
};

const condition = authUser =>
  authUser && authUser.email === process.env.REACT_APP_ADMIN_EMAIL;
export default withAuthorization(condition)(Admin);
