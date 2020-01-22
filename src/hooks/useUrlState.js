import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Parses the current URL and returns the collection + postKey found
export default function useUrlPath() {
  const [collection, setCollection] = useState(null);
  const [postKey, setPostKey] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // e.g. /photography/2019-12-11/test-post
    let pathname = location.pathname;
    const [, urlCollection, date, title] = pathname.split("/");

    let urlKey;
    if (date && title) {
      // hyphens onvert back to spaces
      urlKey = `${date.trim()}-${title.trim().replace(/-/g, " ")}`;
    }

    setCollection(urlCollection);
    setPostKey(urlKey);
  }, [location]);

  return { collection, postKey };
}
