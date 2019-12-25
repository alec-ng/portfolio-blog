import React, { useState } from "react";
import { withAuthorization } from "../components/session";
import {
  ScrapbookEditor,
  createPageData
} from "../components/scrapbook-editor/scrapbook-editor";

import Image from "../components/scrapbook-editor/plugins/image/index";

/**
 * Page level component for admin section
 */
const Admin = function(props) {
  const [editorData, setEditorData] = useState(createPageData());
  const plugins = [Image];

  function onEditorSave(pageMetadata, blocks) {
    console.log("SAVING ---- \n\n");
    console.log(pageMetadata);
    console.log(blocks);
  }

  return (
    <div className="container-fluid p-0">
      <ScrapbookEditor
        pageData={editorData}
        onSave={onEditorSave}
        plugins={plugins}
      />
    </div>
  );
};

const condition = authUser =>
  authUser && authUser.email === process.env.REACT_APP_ADMIN_EMAIL;
export default withAuthorization(condition)(Admin);
