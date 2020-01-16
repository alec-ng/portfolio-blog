import React from "react";
import styled from "styled-components";

const DEFAULT_PADDING = "20px";

const ColouredDiv = styled.div`
  background-color: ${props => props.bgColour};
  color: ${props => props.colour};
  width: 100%;
`;

/**
 * Returns a div with a set background-color and color
 */
export default function ColouredContainer(props) {
  return (
    <ColouredDiv
      className="p-xs-1 p-sm-2 p-md-4 p-lg-5"
      bgColour={props.bgColour}
      colour={props.colour}
    >
      {props.children}
    </ColouredDiv>
  );
}
