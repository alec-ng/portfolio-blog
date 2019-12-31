import React from "react";
import { useLocation, Redirect } from "react-router-dom";

import { ScrapbookEditor } from "./scrapbook-editor/scrapbook-editor";
import Image from "./scrapbook-editor/plugins/image/index";
import Markdown from "./scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "./scrapbook-editor/plugins/cover-photo/index";
import Spacer from "./scrapbook-editor/plugins/spacer/index";
import Carousel from "./scrapbook-editor/plugins/carousel/index";
import Video from "./scrapbook-editor/plugins/video/index";

/**
 * On render, parses the current URL, looks for the page to render, and
 * renders all of its data
 */

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

export default function ContentRenderer(props) {
  // determine initial chosen page
  let location = useLocation();
  let pathArr = location.pathname.split("/");
  let initialPath =
    pathArr.length > 2 &&
    pathArr[pathArr.length - 1].toUpperCase() !== "PHOTOGRAPHY"
      ? pathArr[pathArr.length - 1]
      : "";

  // if initial path is empty, default to first available page
  let doRedirect = initialPath.length === 0;
  if (doRedirect) {
    initialPath = props.pageList[0].id;
  }

  let chosenPageData = props.dataMap[initialPath];
  debugger;

  return (
    <section className="mt-1 mb-3">
      {chosenPageData ? (
        <ScrapbookEditor
          readOnly={true}
          pageData={chosenPageData}
          plugins={plugins}
        />
      ) : (
        <h1 className="text-center">Page not found</h1>
      )}
      {/* Adjust URL path to reflect initial content */
      doRedirect && <Redirect to={`/photography/${initialPath}`} />}
    </section>
  );
}
