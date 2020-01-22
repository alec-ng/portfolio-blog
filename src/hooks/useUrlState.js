import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Parses the current URL and returns the collection + postKey found
export default function useUrlPath() {
  const [collection, setCollection] = useState(null);
  const [postKey, setPostKey] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const { urlCollection, urlKey } = getUrlState(location.pathname);
    setCollection(urlCollection);
    setPostKey(urlKey);
  }, [location]);

  return { collection, postKey };
}

// Imperative method of the above for first-time load, when we don't want to wait
// for the state to be set on the second render
export function getUrlState(pathname) {
  // e.g. /blog/photography/2019-12-11/test-post
  const [, , urlCollection, date, title] = pathname.split("/");

  let urlKey;
  if (date && title) {
    // hyphens onvert back to spaces
    urlKey = `${date.trim()}-${title.trim().replace(/-/g, " ")}`;
  }

  return { urlCollection, urlKey };
}
