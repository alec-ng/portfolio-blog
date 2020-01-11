import { ACTION_TYPES } from "./index";

export default function actionReducer(state, action) {
  let localData = Object.assign({}, state.data);

  switch (action.type) {
    case ACTION_TYPES.CREATE_POST:
      return createPost(state, action, localData);
    case ACTION_TYPES.UPDATE_POST:
      return updatePost(state, action, localData);
    case ACTION_TYPES.UPDATE_POST_DATA:
      return updatePostData(state, action, localData);
    case ACTION_TYPES.DELETE_POST:
      return deletePost(state, action, localData);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function createPost(state, action, localData) {
  localData[action.payload.id] = action.payload.cmsPost;
  return {
    data: localData,
    chosenPost: {
      key: action.payload.id,
      cmsPost: action.payload.cmsPost
    }
  };
}

function updatePost(state, action, localData) {
  let postToUpdate = action.payload.id;
  let localPost = localData[postToUpdate].post;
  localData[postToUpdate].post = Object.assign({}, localPost, action.payload);
  return {
    data: localData
  };
}

function updatePostData(state, action, localData) {
  let postToUpdate = action.payload.id;
  let localPostData = localData[postToUpdate].postData;
  localData[postToUpdate].postData = Object.assign(
    {},
    localPostData,
    action.payload.postData
  );
  return {
    data: localData
  };
}

function deletePost(state, action, localData) {
  delete localData[action.payload.id];
  return {
    data: localData,
    chosenPost: null
  };
}
