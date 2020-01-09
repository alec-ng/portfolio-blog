import { ACTION_TYPES } from "./index";

export default function historyReducer(state, action) {
  let localChanges = Object.assign({}, state.changes);
  let localData = Object.assign({}, state.data);

  switch (action.type) {
    case ACTION_TYPES.CREATE_POST:
      return createPost(state, action, localData, localChanges);
    case ACTION_TYPES.UPDATE_POST:
      return updatePost(state, action, localData, localChanges);
    case ACTION_TYPES.UPDATE_POST_DATA:
      return updatePostData(state, action, localData, localChanges);
    case ACTION_TYPES.DELETE_POST:
      return deletePost(state, action, localData, localChanges);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function createPost(state, action, localData, localChanges) {
  // add new entry to data
  let newPost = Object.assign({}, action.payload);
  newPost.id = `${newPost.date}-${newPost.title}`;
  localData[newPost.id] = {
    post: newPost,
    postData: null
  };

  // log change. if post previously existed and was created with theh same key, then
  // remove the deletion log and mark for update. Else, mark for creation
  if (
    localChanges.delete.indexOf(newPost.id) !== -1 &&
    state.originalPostSet.indexOf(newPost.id) !== -1
  ) {
    let deleteIndex = localChanges.delete.indexOf(newPost.id);
    localChanges.delete.splice(deleteIndex, 1);
    localChanges.updatePost.push(newPost.id);
    localChanges.updatePostData.push(newPost.id);
  } else {
    localChanges.create.push(newPost.id);
  }

  return {
    changes: localChanges,
    data: localData,
    chosenPost: newPost.id
  };
}

function updatePost(state, action, localData, localChanges) {
  let postToUpdate = action.payload.id;
  // if already existed and was updated
  if (
    localChanges.create.indexOf(postToUpdate) === -1 &&
    localChanges.updatePost.indexOf(postToUpdate) === -1
  ) {
    localChanges.updatePost.push(postToUpdate);
  }
  localData[postToUpdate].post = Object.assign(
    {},
    postToUpdate,
    action.payload.post
  );
  return {
    changes: localChanges,
    data: localData
  };
}

function updatePostData(state, action, localData, localChanges) {
  let postToUpdate = action.payload.id;
  // if already existed and was updated
  if (
    localChanges.create.indexOf(postToUpdate) === -1 &&
    localChanges.updatePostData.indexOf(postToUpdate) === -1
  ) {
    localChanges.updatePostData.push(postToUpdate);
  }
  localData[postToUpdate].postData = Object.assign(
    {},
    postToUpdate,
    action.payload.postData
  );
  return {
    changes: localChanges,
    data: localData
  };
}

function deletePost(state, action, localData, localChanges) {
  let postToDelete = action.payload.id;

  // If post was previously created/updated, remove those changes, they don't need to be written
  let createIndex = localChanges.create.indexOf(postToDelete);
  let updatePostIndex = localChanges.updatePost.indexOf(postToDelete);
  let updatePostDataIndex = localChanges.updatePostData.indexOf(postToDelete);
  if (createIndex === -1) {
    localChanges.create.splice(createIndex, 1);
  }
  if (updatePostIndex === -1) {
    localChanges.updatePost.splice(createIndex, 1);
  }
  if (updatePostDataIndex === -1) {
    localChanges.updatePostData.splice(createIndex, 1);
  }

  // If post previously existed and was not created during current session, mark for deletion
  if (state.originalPostSet.indexOf(postToDelete) !== 1) {
    localChanges.delete.push(postToDelete);
  }

  localData.delete(postToDelete);

  return {
    data: localData,
    changes: localChanges,
    chosenPost: null
  };
}
