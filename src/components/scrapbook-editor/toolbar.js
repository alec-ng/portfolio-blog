import React from "react";
import useStateValue from "./state";
import PageMetadata from "./page-metadata";

/**
 * Represents the editor's command bar for modifying page and block metadata
 */
export default function Toolbar(props) {
  return (
    <div style={{ height: "100%", border: "1px solid black" }}>
      <h1>This is my toolbar.</h1>
      <PageMetadata />
    </div>
  );
}

// {/* Page metadata */}
//       {/* Plugin List */}
//       {/* Block metadata */}
