import React from "react";
import LoadingOverlay from "./loading-overlay";
import FancyHr from "./blog-post-hr";
import EndContentNavigator from "./end-content-navigator";

import { BrandywineEditor } from "react-brandywine-editor";
import Image from "react-brandywine-editor/lib/plugins/image/";
import Markdown from "react-brandywine-editor/lib/plugins/markdown/";
import CoverPhoto from "react-brandywine-editor/lib/plugins/cover-photo/";
import Spacer from "react-brandywine-editor/lib/plugins/spacer/";
import Carousel from "react-brandywine-editor/lib/plugins/carousel/";
import EmbeddedVideo from "react-brandywine-editor/lib/plugins/embedded-video/";
import HTMLVideo from "react-brandywine-editor/lib/plugins/html-video/";

const plugins = [
  Image,
  Markdown,
  CoverPhoto,
  Spacer,
  Carousel,
  EmbeddedVideo,
  HTMLVideo
];

/**
 * Renders an instance of scrapbook-editor. If no valid data is provided,
 * renders a loading overlay.
 */
export default function BlogContent(props) {
  return (
    <>
      <LoadingOverlay type="circular" visible={props.loading} />
      {props.postData && (
        <div className="mb-5">
          <BrandywineEditor
            readOnly={true}
            pageData={props.postData}
            plugins={plugins}
            key={JSON.stringify(props.postData)}
          />
          <FancyHr />
          <EndContentNavigator index={props.postIndex} />
        </div>
      )}
    </>
  );
}
