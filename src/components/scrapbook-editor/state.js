import React, { createContext, useReducer, useContext } from "react";

/**
 * Default editor state if none is provided
 */
export const DefaultState = {
  pageMetadata: {
    title: undefined,
    subTitle: undefined,
    createdDate: null,
    lastModified: null,
    displayDate: null,
    tags: [],
    location: undefined
  },
  blocks: [],
  readOnly: false
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

// SAMPLE DATA
////////////////////////////////////////////////////////////////////
// const BASE_EDITOR_STATE = {
//   title: 'Title',
//   createdDate: 'YYYY-MM-DDTHH:mm:ss. sssZ',
//   lastModified: 'YYYY-MM-DDTHH:mm:ss. sssZ',
//   tags: ['tag-1', 'tag-2'],
//   location: 'location',
//   blocks: [
//     {
// blockType: "blockType",
// baseProps: [
//   {
//     name: 'myName',
//     label: 'My Label',
//     value: true
//   }
// ],
// variation: "variation2",
// variationProps: [
//   {
//     name: 'myName',
//     label: 'My Label',
//     value: test
//   }
// ]
//     }
//   ]
// }
