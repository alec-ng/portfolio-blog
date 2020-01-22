import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Parses the current URL and returns the collection + postKey found
export default function useUrlPath() {
  const [collection, setCollection] = useState(null);
  const [postKey, setPostKey] = useState(null);
  const [postDate, setPostDate] = useState(null);
  const [postTitle, setPostTitle] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const { urlCollection, urlKey, date, title } = getUrlState(
      location.pathname
    );
    setCollection(urlCollection);
    setPostKey(urlKey);
    setPostDate(date);
    setPostTitle(title ? title.trim() : title);
  }, [location]);

  return { collection, postKey, postDate, postTitle };
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

  return { urlCollection, urlKey, date, title };
}
