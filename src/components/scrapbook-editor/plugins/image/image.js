import React from "react";
import PlaceholderImgURL from "./placeholder.jpg";
import styled from "styled-components";
import "./style.css";

const DEFAULT_SIZE = "medium";
export const VARIATION_DEFAULT = "image_default";
export const VARIATION_TEXT_OVERLAY = "image_text_overlay";

export function ImageElement(props) {
  const imgSize = props.baseAttrs.size || DEFAULT_SIZE;
  const sizeClassName = `${VARIATION_DEFAULT}-${imgSize}`;

  function Variation() {
    switch (props.variation) {
      case VARIATION_DEFAULT:
        return (
          <BaseImage
            urlSource={props.baseAttrs.urlSource}
            sizeClassName={sizeClassName}
          />
        );
      case VARIATION_TEXT_OVERLAY:
        let variationAttrs = Object.assign(
          {},
          props.variationAttrs[props.variation]
        );
        let variationProps = Object.assign({}, props, {
          variationAttrs: variationAttrs
        });
        return (
          <TextOverlayImage {...variationProps} sizeClassName={sizeClassName} />
        );
      default:
        throw new Error(`Unknown Image variation: ${props.variation}`);
    }
  }

  return <Variation />;
}

export function BaseImage(props) {
  let urlSource = props.urlSource || PlaceholderImgURL;
  return (
    <img
      src={urlSource}
      className={`${props.sizeClassName} img-fluid d-block mx-auto`}
    />
  );
}

const OverlayContainer = styled.div`
  position: absolute;
  margin: 10px;
  color: #ffffff;
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
`;
function TextOverlayImage(props) {
  let [top, right, bottom, left] = [
    props.variationAttrs.top || "0",
    props.variationAttrs.right || "0",
    props.variationAttrs.bottom || "0",
    props.variationAttrs.left || "0"
  ];
  // expect alignment to be one of either left, right, or center to match with CSS class
  let alignmentClass = `text-${props.variationAttrs.align}`;

  return (
    <div style={{ position: "relative" }}>
      <BaseImage
        urlSource={props.baseAttrs.urlSource}
        sizeClassName={props.sizeClassName}
      />
      {(top !== "0" || right !== "0" || bottom !== "0" || left !== "0") && (
        <OverlayContainer top={top} right={right} bottom={bottom} left={left}>
          <h3 className={`${alignmentClass} text-overlay`}>
            {props.variationAttrs.text}
          </h3>
        </OverlayContainer>
      )}
    </div>
  );
}
