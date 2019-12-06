import React from "react";
import styled from "styled-components";

export const VARIATION_STRETCH_NAME = "image_stretch";

export function Stretch(props) {
  const FullWidthImg = styled.img`
    width: 100%;
  `;

  return <FullWidthImg src={props.urlSource} className="image-fluid" />;
}
