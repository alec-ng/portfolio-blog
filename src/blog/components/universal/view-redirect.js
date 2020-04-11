import React from "react";
import { Redirect, useParams } from "react-router-dom";

const defaultUrl = "/blog/map";

/**
 * Declarative redirect to valid view url param
 */
export default function ViewRedirect() {
  const { view } = useParams();
  const doRedirect = view !== "view" && view !== "map";

  return doRedirect ? <Redirect to={defaultUrl} /> : null;
}
