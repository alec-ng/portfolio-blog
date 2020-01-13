import { ACTION_TYPES } from "./index";

export default function actionReducer(state, action) {
  let localData = Object.assign({}, state.data);

  switch (action.type) {
    case ACTION_TYPES.CREATE_POST:
      return createPost(state, action, localData);
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
      // create its own distinct copy of data
      cmsPost: JSON.parse(JSON.stringify(localData[action.payload.id]))
    }
  };
}

function deletePost(state, action, localData) {
  delete localData[action.payload.id];
  return {
    data: localData,
    chosenPost: null
  };
}
