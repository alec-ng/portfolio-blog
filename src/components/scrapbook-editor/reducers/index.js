import blockReducer from "./block-reducer";

export const ACTION_TYPES = {
  // Set page metadata
  UPDATE_INPUT: "UPDATE_INPUT",
  // update block attributes
  SET_BLOCK_ATTRIBUTES: "SET_BLOCK_ATTRIBUTES",
  // on drop event- add new block to canvas
  ADD_BLOCK: "ADD_BLOCK",
  // on add block action or block click, switch focus to selected block
  SWITCH_BLOCK_FOCUS: "SWITCH_BLOCK_FOCUS"
};

export const MainReducer = function(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_INPUT:
      return Object.assign({}, state, {
        pageMetadata: pageMetadataReducer(state.pageMetadata, action)
      });
    case ACTION_TYPES.ADD_BLOCK:
      return Object.assign({}, state, {
        blocks: blockReducer(state.blocks, action)
      });
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
};

const pageMetadataReducer = function(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_INPUT:
      return Object.assign({}, state, {
        [action.payload.inputKey]: action.payload.value
      });
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
};
