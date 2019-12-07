import uuidv1 from "uuid/v1";
import { ACTION_TYPES } from "./index";

export default function blockReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_BLOCK:
      let deepCloneBlocks = JSON.parse(JSON.stringify(state));
      return addNewBlock(
        deepCloneBlocks,
        action.payload.pluginName,
        action.payload.uuid
      );
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
}

/**
 * Sets all blocks as not focused except for the one specified by the uuid
 * and returns a reference to the focused block in blockArr
 */
function switchActiveBlock(blockArr, uuid) {}

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
    for (; i < blockArr.length; i++) {
      if (blockArr[i].uuid === uuid) {
        break;
      }
    }
    blockArr.splice(i, 0, newBlock);
  }
  return {
    focusedBlock: newBlock,
    blocks: blockArr
  };
}
