import blockReducer from "./block-reducer";

export const ACTION_TYPES = {
  // Set page metadata
  UPDATE_INPUT: "UPDATE_INPUT",
  // updating focused block through toolbar
  UPDATE_FOCUSED_BLOCK: "UPDATE_FOCUSED_BLOCK",
  // on drop event- add new block to canvas
  ADD_BLOCK: "ADD_BLOCK",
  // on block click, switch focus to selected block
  SWITCH_BLOCK_FOCUS: "SWITCH_BLOCK_FOCUS",
  // focused block variation switch
  UPDATE_VARIATION: "UPDATE_VARIATION",
  // hides toolbar and shows preview button
  TOGGLE_PREVIEW_MODE: "TOGGLE_PREVIEW_MODE"
};

export const MainReducer = function(state, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_PREVIEW_MODE:
      return Object.assign({}, state, { inPreviewMode: !state.inPreviewMode });
    case ACTION_TYPES.UPDATE_INPUT:
      return Object.assign({}, state, {
        pageMetadata: pageMetadataReducer(state.pageMetadata, action)
      });
    case ACTION_TYPES.ADD_BLOCK:
    case ACTION_TYPES.SWITCH_BLOCK_FOCUS:
    case ACTION_TYPES.UPDATE_FOCUSED_BLOCK:
    case ACTION_TYPES.UPDATE_VARIATION:
      return Object.assign(
        {},
        state,
        blockReducer(
          {
            blocks: state.blocks,
            pluginMap: state.pluginMap,
            focusedBlock: state.focusedBlock
          },
          action
        )
      );
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
