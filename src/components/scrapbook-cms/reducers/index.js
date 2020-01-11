import actionReducer from "./action-reducer";

export const ACTION_TYPES = {
  // new post is created and chosen post is set to it
  CREATE_POST: "CREATE_POST",
  // page metadata is updated for chosen post
  UPDATE_POST: "UPDATE_POST",
  // scrapbook-editor modifies the post contents
  UPDATE_POST_DATA: "UPDATE_POST_DATA",
  // post and its contents are deleted
  DELETE_POST: "DELETE_POST",
  // post is chosen
  SELECT_POST: "SELECT_POST"
};

export const MainReducer = function(state, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_POST:
    case ACTION_TYPES.UPDATE_POST:
    case ACTION_TYPES.UPDATE_POST_DATA:
    case ACTION_TYPES.DELETE_POST:
      return Object.assign({}, state, actionReducer(state, action));
    case ACTION_TYPES.SELECT_POST:
      let data = state.data[action.payload.key];
      let mergeObj = {
        chosenPost: {
          key: action.payload.key,
          cmsPost: data
        }
      };
      return Object.assign({}, state, mergeObj);
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
  }
};
