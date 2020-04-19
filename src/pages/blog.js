import React from "react";
import Blog from "../blog/components/containers/app";
import { FirebaseProvider } from "../blog/contexts/firebase";
import { UIStateProvider } from "../blog/contexts/ui-context";

/**
 * Renders blog app container component wrapped in context providers
 */
export default function BlogPage() {
  return (
    <FirebaseProvider>
      <UIStateProvider>
        <Blog />
      </UIStateProvider>
    </FirebaseProvider>
  );
}
