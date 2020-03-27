import React from "react";
import Blog from "../components/blog/containers/app";
import Firebase, { FirebaseContext } from "../hoc/firebase";
import { UIStateProvider } from "../contexts/ui-context";

/**
 * Renders blog app container component wrapped in firebase HOC
 */
export default function BlogPage() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <UIStateProvider>
        <Blog />
      </UIStateProvider>
    </FirebaseContext.Provider>
  );
}
