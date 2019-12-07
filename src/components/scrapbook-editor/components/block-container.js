import React from "react";
import styled from "styled-components";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";

/**
 * Wraps a block in a container that provides focus functionality
 * via CSS class and dispatch action
 */
export default function BlockContainer(props) {
  const [{}, dispatch] = useStateValue();
  const FocusDiv = styled.div`
    border: ${props => (props.isFocused ? "2px solid blue" : "none")};
  `;

  function onClick(e) {
    dispatch({
      type: ACTION_TYPES.SWITCH_BLOCK_FOCUS,
      payload: {
        uuid: props.uuid
      }
    });
  }

  return (
    <FocusDiv onClick={onClick} isFocused={props.isFocused}>
      {props.children}
    </FocusDiv>
  );
}
