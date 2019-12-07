import uuidv1 from "uuid/v1";
import { ACTION_TYPES } from "./index";

export default function blockReducer(state, action) {
  let deepCloneBlocks = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ACTION_TYPES.ADD_BLOCK:
      return addNewBlock(
        deepCloneBlocks,
        action.payload.pluginName,
        action.payload.uuid
      );
    case ACTION_TYPES.SWITCH_BLOCK_FOCUS:
      return switchActiveBlock(deepCloneBlocks, action.payload.uuid);
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
}

/**
 * Sets all blocks as not focused except for the one specified by the uuid
 * and returns a reference to the focused block in blockArr
 */
function switchActiveBlock(blockArr, uuid) {
  blockArr.forEach(block => {
    block.isFocused = false;
  });

  let newActiveBlock = blockArr.find(block => block.uuid === uuid);
  newActiveBlock.isFocused = true;
  return {
    blocks: blockArr,
    focusedBlock: newActiveBlock
  };
}

/**
 * Given the name of the new block to add, creates a new block object to
 * add to blockArr at an index determined by uuid
 */
function addNewBlock(blockArr, pluginName, uuid) {
  let newBlock = {
    name: pluginName,
    baseAttrs: {},
    variation: "stretch", // TODO: add logic for default variation here
    variationAttrs: {},
    uuid: uuidv1(),
    isFocused: true
  };
  // Set all other blocks focus to false
  blockArr.forEach(block => {
    block.isFocused = false;
  });
  // add new block into array at correct position
  if (!uuid) {
    blockArr.push(newBlock);
  } else {
    let i = 0;
    let indexToAdd = blockArr.findIndex(block => block.uuid === uuid);
    blockArr.splice(indexToAdd, 0, newBlock);
  }
  return {
    focusedBlock: newBlock,
    blocks: blockArr
  };
}
