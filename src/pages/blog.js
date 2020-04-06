import React from "react";
import Blog from "../blog/components/containers/app";
import Firebase, { FirebaseContext } from "../blog/hoc/firebase";
import { UIStateProvider } from "../blog/contexts/ui-context";

/**
 * Renders blog app container component wrapped in context providers
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
