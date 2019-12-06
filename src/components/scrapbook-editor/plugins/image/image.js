import React, { useState } from "react";
import styled from "styled-components";
import PlaceholderImg from "./placeholder.jpg"; // TODO: move into this directory
import { Stretch, VARIATION_STRETCH_NAME } from "./variation-stretch";

export const VariationNames = {
  STRETCH: VARIATION_STRETCH_NAME
};

export function ImageElement(props) {
  const [baseAttributes, setBaseAttributes] = useState(props.baseAttributes);
  const [variationAttributes, setVariationAttributes] = useState(
    props.variationAttributes
  );

  function Variation() {
    if (!props.urlSource) {
      // default placeholder
      const PlaeholderImg = styled.img`
        width: 100%;
      `;
      return <img className="img-fluid" src={PlaceholderImg} />;
    }

    switch (props.variation) {
      case VariationNames.STRETCH:
        return <Stretch urlSource={props.urlSource} />;
      default:
        throw new Error(`Unknown Image variation: ${props.variation}`);
    }
  }

  return <Variation />;
}
