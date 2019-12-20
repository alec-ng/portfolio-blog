import React, { useState } from "react";
import styled from "styled-components";
import PlaceholderImg from "./placeholder.jpg";
import { Stretch, VARIATION_STRETCH } from "./variation-stretch";

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
      case VARIATION_STRETCH:
        return <Stretch urlSource={props.urlSource} />;
      default:
        throw new Error(`Unknown Image variation: ${props.variation}`);
    }
  }

  return <Variation />;
}
