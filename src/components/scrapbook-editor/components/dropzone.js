import React, { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";

export default function DropZone(props) {
  const [{}, dispatch] = useStateValue();
  // local state value
  const [dragEnter, setDragEnter] = useState(false);

  /**
   * Overwrite browser default behaviour to allow drag n' drop
   */
  function onDragOver(e) {
    e.preventDefault();
  }

  function setDragLeft(e) {
    setDragEnter(false);
  }
  function setDrag(e) {
    setDragEnter(true);
  }

  /**
   * Extract the plugin name from dataTransfer
   * Dispatch add_block action
   */
  function onDrop(e) {
    const pluginName = e.dataTransfer.getData("pluginName");
    // assumes dropzone uuid is of form dropzone-{uuid}, set in canvas.js
    let uuid = props.uuid ? props.uuid.replace("dropzone-", "") : null;
    dispatch({
      type: ACTION_TYPES.ADD_BLOCK,
      payload: {
        pluginName: pluginName,
        uuid: uuid
      }
    });
  }

  const DropZoneDiv = styled.div`
    z-index: 9999;
    height: 15px;
    background-color: rgba(0, 0, 0, 0.03);
    border: ${props =>
      props.dragEnter
        ? "1px dashed rgba(0,0,0,0.5)"
        : "1px dashed rgba(0,0,0,0.15)"};
    color: rgba(0, 0, 0, 0.5);
  `;
  return (
    <DropZoneDiv
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={setDragLeft}
      onDragEnter={setDrag}
      dragEnter={dragEnter}
    />
  );
}
