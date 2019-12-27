import React from "react";
import { PageMetadata } from "./components/page-metadata";
import { useStateValue } from "./state";
import { ACTION_TYPES } from "./reducers/index";
import DropZone from "./components/dropzone";
import BlockContainer from "./components/block-container";

// /**
//  * Utility component to render the block element as pure
//  */
// const MemoBlockElement = React.memo((props) => {
//   let blockEleProps = Object.assign({}, props);
//   const BlockElement = props.blockElement;
//   delete blockEleProps.blockElement;

//   return (
//     <BlockElement {...blockEleProps} />
//   )
// });

export default function Canvas(props) {
  const [
    { blocks, pluginMap, readOnly, inPreviewMode, verticalBlockMargin },
    dispatch
  ] = useStateValue();
  const renderDropzones = !readOnly && !inPreviewMode;

  const handleBlockClick = function(e) {
    if (readOnly || inPreviewMode) {
      return;
    }
    dispatch({
      type: ACTION_TYPES.SWITCH_BLOCK_FOCUS,
      payload: {
        uuid: e.currentTarget.dataset.uuid
      }
    });
  };

  // Each item in the global state 'blocks' props is displayed with a dropzone
  // and the element itself
  let list = [];
  blocks.forEach(block => {
    let BlockElement = pluginMap[block.name].canvasElement;

    // create a local copy ?
    let baseAttrVals = Object.assign({}, block.baseAttrs);
    let variationAttrVals = Object.assign({}, block.variationAttrs);

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
        locked={readOnly || inPreviewMode}
        verticalBlockMargin={verticalBlockMargin}
        key={block.uuid}
        isFocused={block.isFocused}
        uuid={block.uuid}
        onBlockClick={handleBlockClick}
        variation={block.variation}
        baseAttrs={baseAttrVals}
        variationAttrs={variationAttrVals}
        blockElement={BlockElement}
      />
    );
  });

  return (
    <>
      <PageMetadata />
      {list}
      {renderDropzones && <DropZone />}
    </>
  );
}
