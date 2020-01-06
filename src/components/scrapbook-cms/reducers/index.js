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
      return Object.assign({}, state, { changeList: [] });
    case ACTION_TYPES.SELECT_POST:
      return Object.assign({}, state, chosenPostReducer(state, action));
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
};

function chosenPostReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SELECT_POST:
      return {};
  }
}

function historyReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_POST:
    case ACTION_TYPES.UPDATE_POST:
    // Check if post was previously created this session. if it has, update that aata
    // If it was previously updated, update that data
    // Else, if newly updated, add new entry
    case ACTION_TYPES.UPDATE_POST_DATA:
    // Check if post was previously created this session. if it has, update that aata
    // If it was previously updated, update that data
    // Else, if newly updated, add new entry
    case ACTION_TYPES.DELETE_POST:
      // remove any entries for create/update
      // push for delete
      return {};
  }
}
