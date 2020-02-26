import React from "react";

/**
 * bootstrap style spinner
 */
export default function Spinner() {
  return (
    <div
      className="spinner-border spinner-border-sm"
      role="status"
      style={{
        marginBottom: "2px",
        marginRight: "5px"
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
