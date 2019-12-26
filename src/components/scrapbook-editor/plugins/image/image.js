import React from "react";
import PlaceholderImgURL from "./placeholder.jpg";
import "./style.css";

const DEFAULT_SIZE = "medium";
export const VARIATION_DEFAULT = "image_default";

export function ImageElement(props) {
  const imgSize = props.baseAttrs.size || DEFAULT_SIZE;
  const sizeClassName = `${VARIATION_DEFAULT}-${imgSize}`;

  function Variation() {
    let urlSource = props.baseAttrs.urlSource || PlaceholderImgURL;

    switch (props.variation) {
      case VARIATION_DEFAULT:
        return (
          <img
            src={urlSource}
            className={`${sizeClassName} img-fluid d-block mx-auto`}
          />
        );
      default:
        throw new Error(`Unknown Image variation: ${props.variation}`);
    }
  }

  return <Variation />;
}
