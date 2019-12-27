import React, { createContext, useReducer, useContext } from "react";

/**
 * Default editor state if none is provided
 */
export const DefaultState = {
  plugins: null,
  pluginMap: null,
  pageMetadata: {
    title: undefined,
    subTitle: undefined,
    createdDate: null,
    lastModified: null,
    displayDate1: null,
    displayDate2: null,
    tags: [],
    location: undefined
  },
  blocks: [],
  readOnly: false,
  focusedBlock: undefined,
  inPreviewMode: false,
  verticalBlockMargin: null
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
