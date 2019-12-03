import React, { useState } from "react";
import styled from "styled-components";
import img_placeholder from "../assets/blog/placeholder.jpg"; // TODO: move into this directory
// TODO: small icon image here

import { PHOTOESSAY_DEFN, Photoessay } from "./variation-photoessay";

export function Image(props) {
  const [baseAttributes, setBaseAttributes] = useState(props.baseAttributes);
  const [variationAttributes, setVariationAttributes] = useState(
    props.variationAttributes
  );

  function renderVariation() {
    if (!props.urlSource) {
      // default placeholder
      const PlaeholderImg = styled.img`
        width: 100%;
      `;
      return <PlaceholderImg className="img-fluid" src={img_placeholder} />;
    }

    if (props.variation === PHOTOESSAY_DEFN.name) {
      return <Photoessay baseAttributes={baseAttributes} />;
    }
  }

  render({ renderVariation });
}

export function Controls(props) {
  const [baseAttributes, setBaseAttributes] = useState(props.baseAttributes);
  const [variationAttributes, setVariationAttributes] = useState(
    props.variationAttributes
  );

  function renderControl() {}

  return (
    // base controls here
    <section>
      <input
        type="text"
        data-name="urlSource"
        onInput={updateAttribute}
        placeholder="URL Source"
      />
    </section>
  );
}
