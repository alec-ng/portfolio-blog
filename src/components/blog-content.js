import React from "react";
import LoadingOverlay from "./loading-overlay";

import { BrandywineEditor } from "./scrapbook-editor/";
import Image from "./scrapbook-editor/plugins/image/index";
import Markdown from "./scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "./scrapbook-editor/plugins/cover-photo/index";
import Spacer from "./scrapbook-editor/plugins/spacer/index";
import Carousel from "./scrapbook-editor/plugins/carousel/index";
import Video from "./scrapbook-editor/plugins/video/index";

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

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
        </div>
      )}
    </>
  );
}
