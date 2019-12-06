import React from "react";
import styled from "styled-components";
import { PageMetadata } from "./components/page-metadata";
import { useStateValue } from "./state";
import DropZone from "./components/dropzone";
import { ImageElement } from "./plugins/image/image";

export default function Canvas(props) {
  const [{ blocks, plugins, readOnly }, dispatch] = useStateValue();

  /**
   * Create mapping of block names to plugin React elements
   */
  const pluginMap = {};
  plugins.forEach(plugin => {
    pluginMap[plugin.name] = plugin.canvasElement;
  });

  /**
   * Each item in the global state 'blocks' props is displayed with a dropzone
   * and the element itself
   */
  function renderContent() {
    let list = [];
    blocks.forEach(block => {
      let BlockElement = pluginMap[block.name];
      list.push(<DropZone />);
      list.push(
        <BlockElement
          variation={block.variation}
          baseAttrs={block.baseAttrs}
          variationAttrs={block.variationAttrs}
          isFocused={block.isFocused}
        />
      );
    });
    return list;
  }

  return (
    <>
      <PageMetadata />
      {renderContent()}
      <DropZone />
    </>
  );
}
