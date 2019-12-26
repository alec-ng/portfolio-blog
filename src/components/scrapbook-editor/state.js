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
  inPreviewMode: false
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
const BASE_EDITOR_STATE = {
  title: "Title",
  createdDate: "YYYY-MM-DDTHH:mm:ss. sssZ",
  lastModified: "YYYY-MM-DDTHH:mm:ss. sssZ",
  tags: ["tag-1", "tag-2"],
  location: "location",
  blocks: [
    {
      blockType: "blockType",
      baseProps: {
        name1: "value1",
        name2: "value2"
      },
      variation: "variation2",
      variationProps: {
        name1: "name2",
        name2: "name3"
      }
    }
  ]
};

const BLOCK_DEFINITION = {
  name: "Image",
  label: "Image",
  description: "An image rendered from a URL source",
  icon: null,
  baseAttrs: [
    {
      name: "urlSource",
      label: "URL",
      type: "text"
      // could also add validation rules here
    }
  ],
  variations: [
    {
      stretch: {
        label: "Full Width",
        attrs: [] // no additional variational attributes
      }
    }
  ]
};
