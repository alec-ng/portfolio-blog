import React from "react";
import { withAuthorization } from "../components/session";
import { ScrapbookEditor } from "../components/scrapbook-editor/scrapbook-editor";

import Image from "../components/scrapbook-editor/plugins/image/index";
import Markdown from "../components/scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "../components/scrapbook-editor/plugins/cover-photo/index";
import Spacer from "../components/scrapbook-editor/plugins/spacer/index";
import Carousel from "../components/scrapbook-editor/plugins/carousel/index";
import Video from "../components/scrapbook-editor/plugins/video/index";

/**
 * Page level component for admin section
 */
const Admin = function(props) {
  return (
    <div className="container-fluid p-0">
      <ScrapbookEditor
        onSave={onEditorSave}
        plugins={plugins}
        showPluginDescription={false}
      />
    </div>
  );
};

const condition = authUser =>
  authUser && authUser.email === process.env.REACT_APP_ADMIN_EMAIL;
export default withAuthorization(condition)(Admin);

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

const onEditorSave = function(pageMetadata, header, blocks) {
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
