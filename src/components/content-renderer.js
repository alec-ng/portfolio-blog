import React from "react";
import EditorRenderer from "./editor-renderer";
import { useLocation, Redirect } from "react-router-dom";

/**
 * On render, parses the current URL and determines the page to render
 */
export default function ContentRenderer(props) {
  let location = useLocation();
  let pathArr = location.pathname.split("/"); // {baseUrl}/photography/{id}
  let initialPath =
    pathArr.length > 2 &&
    pathArr[pathArr.length - 1].toUpperCase() !==
      props.sectionPath.toUpperCase()
      ? pathArr[pathArr.length - 1]
      : "";

  // if initial path is empty, default to first available page
  let doRedirect = initialPath.length === 0;
  if (doRedirect) {
    initialPath = props.pageList[0].id;
  }
  let pageData = props.dataMap[initialPath];

  return (
    <section className="mt-1 mb-3">
      {<EditorRenderer pageData={pageData} />}
      {doRedirect && <Redirect to={`/photography/${initialPath}`} />}
    </section>
  );
}
