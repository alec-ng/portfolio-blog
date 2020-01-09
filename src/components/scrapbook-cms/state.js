import React, { createContext, useReducer, useContext } from "react";

/**
 * Default editor state if none is provided
 */
export const DefaultState = {
  onSave: undefined,
  data: {}, // postId > {post, postData}
  chosenPost: null, // pointer to an element in postData
  changes: {
    create: [],
    updatePost: [],
    updatePostData: [],
    delete: []
  },
  originalPostSet: [] // // ids of all posts that exist in the db
};

/**
 * State management for ScrapbookEditor
 */
export const StateContext = createContext();

/**
 * Returns a React component that wraps its children in a provider
 *
 * @param reducer main reducer object
 * @param initialState
 * @param children app content that should access the state
 */
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

/**
 * Returns the state and reducer of the context, initially
 * provided by the arguments of StateProvider()
 */
export const useStateValue = () => useContext(StateContext);
