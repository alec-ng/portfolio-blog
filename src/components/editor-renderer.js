import React from "react";

import { ScrapbookEditor } from "./scrapbook-editor/scrapbook-editor";
import Image from "./scrapbook-editor/plugins/image/index";
import Markdown from "./scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "./scrapbook-editor/plugins/cover-photo/index";
import Spacer from "./scrapbook-editor/plugins/spacer/index";
import Carousel from "./scrapbook-editor/plugins/carousel/index";
import Video from "./scrapbook-editor/plugins/video/index";

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

/**
 * Wraps the scrapbook-editor package up and displays one page in read only
 */
export default function EditorRenderer(props) {
  return (
    <>
      {props.pageData ? (
        /* ScrapbookEditor as an uncontrolled component */
        <ScrapbookEditor
          readOnly={true}
          pageData={props.pageData}
          plugins={plugins}
          key={JSON.stringify(props.pageData)}
        />
      ) : (
        <>
          <h1 className="text-center">This doesn't look like a valid page!</h1>
          <h3 className="text-center text-muted">
            It looks like you navigated to a page that doesn't exist. Try
            finding the page in the sidebar.
          </h3>
        </>
      )}
    </>
  );
}
