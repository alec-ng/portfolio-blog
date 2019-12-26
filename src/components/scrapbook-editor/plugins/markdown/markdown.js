import React from "react";
import ReactMarkdown from "react-markdown";

export const VARIATION_DEFAULT = "markdown_default";

export function MarkdownElement(props) {
  return (
    <div class="container py-3">
      {props.baseAttrs.source ? (
        <ReactMarkdown source={props.baseAttrs.source} />
      ) : (
        <h6 className="text-center">Markdown will be rendered here</h6>
      )}
    </div>
  );
}
