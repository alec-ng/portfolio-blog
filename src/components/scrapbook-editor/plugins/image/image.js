import React, { useState } from "react";
import styled from "styled-components";
import PlaceholderImgURL from "./placeholder.jpg";
import { Stretch, VARIATION_STRETCH } from "./variation-stretch";

export function ImageElement(props) {
  function Variation() {
    if (!props.baseAttrs || !props.baseAttrs.urlSource) {
      const PlaceholderImg = styled.img`
        width: 100%;
      `;
      return <PlaceholderImg className="img-fluid" src={PlaceholderImgURL} />;
    }

    switch (props.variation) {
      case VARIATION_STRETCH:
        return (
          <Stretch
            baseAttrs={props.baseAttrs}
            variationAttrs={props.variationAttrs}
          />
        );
      default:
        throw new Error(`Unknown Image variation: ${props.variation}`);
    }
  }

  return <Variation />;
}
