import actionReducer from "./action-reducer";

export const ACTION_TYPES = {
  // new post is created and chosen post is set to it
  CREATE_POST: "CREATE_POST",
  // post and its contents are deleted
  DELETE_POST: "DELETE_POST",
  // on editor change
  UPDATE_CURRENT_POSTDATA: "UPDATE_CURRENT_POSTDATA",
  // on page metadata change
  UPDATE_CURRENT_POST: "UPDATE_CURRENT_POST",
  // on saving the current post button click
  SAVE_CURRENT_POST: "SAVE_CURRENT_POST",
  // saving the current post and exiting the current view
  CLOSE_CURRENT_POST: "CLOSE_CURRENT_POST",
  // toggle publish flags
  PUBLISH_CURRENT_POST: "PUBLISH_CURRENT_POST",
  UNPUBLISH_CURRENT_POST: "UNPUBLISH_CURRENT_POST",
  // post is chosen
  SELECT_POST: "SELECT_POST"
};

export const MainReducer = function(state, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_POST:
    case ACTION_TYPES.DELETE_POST:
    case ACTION_TYPES.UPDATE_DATA:
      return Object.assign({}, state, actionReducer(state, action));

    // TODO
    case ACTION_TYPES.UPDATE_CURRENT_POSTDATA:
      let localChosenPost = Object.assign({}, state.chosenPost);
      localChosenPost.cmsPost.postData = action.payload;
      return Object.assign({}, state, { chosenPost: localChosenPost });
    case ACTION_TYPES.UPDATE_CURRENT_POST:
      let chosenPost = Object.assign({}, state.chosenPost);
      chosenPost.cmsPost.post[action.payload.property] = action.payload.value;
      return Object.assign({}, state, { chosenPost: chosenPost });
    case ACTION_TYPES.SAVE_CURRENT_POST:
      return state;
    case ACTION_TYPES.CLOSE_CURRENT_POST:
      return state;
    case ACTION_TYPES.PUBLISH_CURRENT_POST:
      return state;
    case ACTION_TYPES.UNPUBLISH_CURRENT_POST:
      return state;
    // TODO

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

function updatePost(state, action, localData) {
  let postToUpdate = action.payload.id;
  let localPost = localData[postToUpdate].post;
  localData[postToUpdate].post = Object.assign({}, localPost, action.payload);
  return {
    data: localData
  };
}
