const ACTION_TYPES = {
  // Set page metadata
  UPDATE_INPUT: "UPDATE_INPUT",
  // update block attributes
  SET_BLOCK_ATTRIBUTES: "SET_BLOCK_ATTRIBUTES"
};

const MainReducer = function(state, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_INPUT:
      return Object.assign({}, state, {
        pageMetadata: pageMetadataReducer(state.pageMetadata, action)
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

export default MainReducer;
