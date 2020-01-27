import React from "react";
import LoadingOverlay from "./loading-overlay";
import FancyHr from "./blog-post-hr";
import EndContentNavigator from "./end-content-navigator";

import { BrandywineEditor } from "./scrapbook-editor/";
import Image from "./scrapbook-editor/plugins/image/index";
import Markdown from "./scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "./scrapbook-editor/plugins/cover-photo/index";
import Spacer from "./scrapbook-editor/plugins/spacer/index";
import Carousel from "./scrapbook-editor/plugins/carousel/index";
import EmbeddedVideo from "../components/scrapbook-editor/plugins/embedded-video/";
import HTMLVideo from "../components/scrapbook-editor/plugins/html-video/";

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
