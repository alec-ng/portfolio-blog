import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

export const VARIATION_DEFAULT = "markdown_default";

export function MarkdownElement(props) {
  return (
    <div className="mx-auto scrapbookeditor-repsonsive-x-padding scrapbookeditor-width_large py-3">
      {props.baseAttrs.source ? (
        <ReactMarkdown source={props.baseAttrs.source} />
      ) : (
        <h6 className="text-center text-muted">
          Markdown will be rendered here
        </h6>
      )}
    </div>
  );
}
