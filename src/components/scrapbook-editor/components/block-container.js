import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";

/**
 * Wraps a block in a container that provides focus functionality
 * via CSS class and dispatch action
 */
export default function BlockContainer(props) {
  const [
    { readOnly, inPreviewMode, verticalBlockMargin },
    dispatch
  ] = useStateValue();
  const FocusDiv = styled.div`
    border: ${props =>
      props.isFocused && !readOnly && !inPreviewMode
        ? "2pt solid rgba(0,0,0,0.5)"
        : "none"};
    margin-bottom: ${props =>
      (props.readOnly || inPreviewMode) && verticalBlockMargin
        ? verticalBlockMargin
        : 0};
  `;
  let containerDivRef = React.createRef();

  // Scroll into view whenever the block is in focus
  useEffect(() => {
    if (props.isFocused && !readOnly && !inPreviewMode) {
      containerDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  function onClick(e) {
    if (readOnly || inPreviewMode) {
      return;
    }
    dispatch({
      type: ACTION_TYPES.SWITCH_BLOCK_FOCUS,
      payload: {
        uuid: props.uuid
      }
    });
  }

  return (
    <FocusDiv
      onClick={onClick}
      isFocused={props.isFocused}
      ref={containerDivRef}
    >
      {props.children}
    </FocusDiv>
  );
}
