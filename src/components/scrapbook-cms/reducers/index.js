import historyReducer from "./history-reducer";

export const ACTION_TYPES = {
  // new post is created and chosen post is set to it
  CREATE_POST: "CREATE_POST",
  // page metadata is updated for chosen post
  UPDATE_POST: "UPDATE_POST",
  // scrapbook-editor modifies the post contents
  UPDATE_POST_DATA: "UPDATE_POST_DATA",
  // post and its contents are deleted
  DELETE_POST: "DELETE_POST",
  // on successful save, clear out change list
  CLEAR_HISTORY: "CLEAR_HISTORY",
  // post is chosen
  SELECT_POST: "SELECT_POST"
};

export const MainReducer = function(state, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_POST:
    case ACTION_TYPES.UPDATE_POST:
    case ACTION_TYPES.UPDATE_POST_DATA:
    case ACTION_TYPES.DELETE_POST:
      return Object.assign({}, state, historyReducer(state, action));
    case ACTION_TYPES.CLEAR_HISTORY:
      return Object.assign({}, state, {
        changeList: [],
        originalPostSet: Object.keys(state.data)
      });
    case ACTION_TYPES.SELECT_POST:
      return Object.assign({}, state, { chosenPost: action.payload.id });
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
};
