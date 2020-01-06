import React from "react";
import { withAuthorization } from "../components/session";
import { ScrapbookCMS } from "../components/scrapbook-cms/scrapbook-cms";

import Image from "../components/scrapbook-editor/plugins/image/index";
import Markdown from "../components/scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "../components/scrapbook-editor/plugins/cover-photo/index";
import Spacer from "../components/scrapbook-editor/plugins/spacer/index";
import Carousel from "../components/scrapbook-editor/plugins/carousel/index";
import Video from "../components/scrapbook-editor/plugins/video/index";

const Admin = function(props) {
  // TODO: on initialization (once), read all post and postContent data from firebase

  // Could be derived off of a subset of data to feed in, e.g. trip reports vs photography
  const key = "";

  return (
    <div className="container-fluid p-0">
      <ScrapbookCMS
        key={key}
        onCMSSave={onCMSSave}
        data={testData}
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

const testData = {
  "test-uuid": {
    post: {},
    postContent: {}
  },
  "test-uuid-2": {
    post: {},
    postContent: {}
  }
};

const onCMSSave = function(history) {
  // TODO:
  // history = [{actionType, payload}, ...]
  // do a batched write --- https://cloud.google.com/firestore/docs/manage-data/transactions#batched-writes
  // should return back a confirmation (true if successful) -- if so, ScrapbookCMS should clear out the history list
};

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
