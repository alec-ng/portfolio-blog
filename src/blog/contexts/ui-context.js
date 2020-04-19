import React from "react";

/**
 * Context to maintain visibility state global UI elements
 */

// --------- SHAPE

const INITIAL_STATE = {
  showDrawer: false,
  showFilterDialog: false
};

// --------- ACTIONS & REDUCERS

export const SET_DRAWER_OPEN = "SET_DRAWER_OPEN";
export const SET_FILTER_OPEN = "SET_FILTER_OPEN";

function uiStateReducer(state, action) {
  switch (action.type) {
    case SET_DRAWER_OPEN:
      return Object.assign({}, state, {
        showDrawer: action.val
      });
    case SET_FILTER_OPEN:
      return Object.assign({}, state, {
        showFilterDialog: action.val
      });
    default:
      console.warn(`Unknown ui state action type: ${action.type}`);
      return state;
  }
}

// --------- PROVIDER

const UIStateContext = React.createContext();

export default function useUIState() {
  return React.useContext(UIStateContext);
}

export function UIStateProvider({ children }) {
  const stateAndDispatch = React.useReducer(uiStateReducer, INITIAL_STATE);
  return (
    <UIStateContext.Provider value={stateAndDispatch}>
      {children}
    </UIStateContext.Provider>
  );
}
