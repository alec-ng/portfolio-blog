import React from "react";
import styled from "styled-components";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";

export default function DropZone(props) {
  const [{}, dispatch] = useStateValue();

  /**
   * Overwrite browser default behaviour to allow drag n' drop
   */
  function onDragOver(e) {
    e.preventDefault();
  }

  /**
   * Extract the plugin name from dataTransfer
   * Dispatch add_block action
   */
  function onDrop(e) {
    const pluginName = e.dataTransfer.getData("pluginName");
    dispatch({
      type: ACTION_TYPES.ADD_BLOCK,
      payload: {
        pluginName: pluginName,
        uuid: props.uuid
      }
    });
  }

  const DropZoneDiv = styled.div`
    height: 20px;
    background-color: rgba(0, 0, 0, 0.5);
  `;
  return (
    <DropZoneDiv onDragOver={onDragOver} onDrop={onDrop}>
      <p>DropZone</p>
    </DropZoneDiv>
  );
}
