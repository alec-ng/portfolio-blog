import React from "react";
import TripReportData from "./trip-report-data";
import { BrandywineReader } from "react-brandywine-editor/lib/read-mode/index";
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
 * Renders page data in readonly BrandywineEditor instance and collection
 * specific metadata
 * See index.css for brandywine css overrides + customizztion
 */
function Editor({ pageData, metadata }) {
  return (
    <article>
      <BrandywineReader
        pageData={pageData}
        plugins={plugins}
        customContent={<TripReportData metadata={metadata} />}
      />
    </article>
  );
}

// Re-renders only when the pagedata changes to prevent flickering of pre-cached
// post metadata
const isEqual = (prevProps, nextProps) =>
  prevProps.pageData === nextProps.pageData;
export default React.memo(Editor, isEqual);
