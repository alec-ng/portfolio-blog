import React from "react";
import styled from "styled-components";
import { PageMetadata } from "./components/page-metadata";
import { useStateValue } from "./state";
import DropZone from "./components/dropzone";
import { ImageElement } from "./plugins/image/image";
import BlockContainer from "./components//block-container";

export default function Canvas(props) {
  const [
    { blocks, pluginMap, readOnly, inPreviewMode },
    dispatch
  ] = useStateValue();
  const renderDropzones = !readOnly && !inPreviewMode;

  /**
   * Each item in the global state 'blocks' props is displayed with a dropzone
   * and the element itself
   */
  function renderContent() {
    let list = [];
    blocks.forEach(block => {
      let BlockElement = pluginMap[block.name].canvasElement;
      let variationAttrs = block.variationAttrs[block.variation] || {};

      if (renderDropzones) {
        list.push(
          <DropZone
            key={`dropzone-${block.uuid}`}
            uuid={`dropzone-${block.uuid}`}
          />
        );
      }
      list.push(
        <BlockContainer
          key={block.uuid}
          isFocused={block.isFocused}
          uuid={block.uuid}
        >
          <BlockElement
            variation={block.variation}
            baseAttrs={block.baseAttrs}
            variationAttrs={block.variationAttrs}
          />
        </BlockContainer>
      );
    });

    return list;
  }

  return (
    <>
      <PageMetadata />
      {renderContent()}
      {renderDropzones && <DropZone />}
    </>
  );
}