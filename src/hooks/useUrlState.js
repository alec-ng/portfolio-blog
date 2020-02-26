import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { urlDecodeStr } from "../util/url-util";
const queryString = require("query-string");

/**
 * Parses the current URL
 * The URL is the blog's source of truth for its state
 */
export default function useUrlPath() {
  const [collection, setCollection] = useState(null);
  const [postKey, setPostKey] = useState(null);
  const [postDate, setPostDate] = useState(null);
  const [postTitle, setPostTitle] = useState(null);
  const [filters, setFilters] = useState({});

  const location = useLocation();

  useEffect(() => {
    const { urlCollection, urlKey, date, originalTitle, filters } = getUrlState(
      location
    );

    setCollection(urlCollection);
    setPostKey(urlKey);
    setPostDate(date);
    setPostTitle(originalTitle);
    setFilters(filters);
  }, [location]);

  return { collection, postKey, postDate, postTitle, filters };
}

/**
 * Imperative method of the above for first-time load
 * location should be {useLocation } from react-router-dom
 */
export function getUrlState(location) {
  // e.g. /blog/photography/2019-12-11/test-post?filter1=value&filter2=value
  const [, , urlCollection, date, title] = location.pathname.split("/");

  let urlKey;
  let originalTitle;
  if (date && title) {
    originalTitle = urlDecodeStr(title);
    urlKey = `${date.trim()}-${originalTitle}`;
  }
  const filters = queryString.parse(location.search);
  return { urlCollection, urlKey, date, originalTitle, filters };
}
