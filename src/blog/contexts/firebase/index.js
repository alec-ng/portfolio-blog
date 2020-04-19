import React from "react";
import Firebase from "./api";

/**
 * Context only provides singleton firebase instance, with no dispatch
 */
const FirebaseContext = React.createContext();

export default function useFirebase() {
  return React.useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {
  const firebase = new Firebase();
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
}
