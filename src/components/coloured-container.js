import React from "react";
import styled from "styled-components";

const ColouredDiv = styled.div`
  background-color: ${props => props.bgColour};
  color: ${props => props.colour};
  width: 100%;
  overflow-x: hidden;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  @media (min-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media (min-width: 992px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

/**
 * Returns a div with a set background-color and color
 */
export default function ColouredContainer(props) {
  return (
    <ColouredDiv
      className="py-5"
      bgColour={props.bgColour}
      colour={props.colour}
    >
      {props.children}
    </ColouredDiv>
  );
}
