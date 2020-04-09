import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { urlDecodeStr } from "../util/url-util";
import useUrlView from "../hooks/useUrlView";
import { APP_VIEW } from "../util/constants";
const queryString = require("query-string");

/**
 * Parses the current URL
 * The URL is the blog's source of truth for its state
 */
export default function useUrlPath() {
  const [collection, setCollection] = useState(null);
  const [filters, setFilters] = useState({});

  // Post view specific
  const [slug, setslug] = useState(null);
  const [postDate, setPostDate] = useState(null);
  const [postTitle, setPostTitle] = useState(null);

  const location = useLocation();
  const view = useUrlView();

  useEffect(() => {
    const urlState = getUrlState(location);
    setCollection(urlState.collection);
    setFilters(urlState.filters);

    if (view === APP_VIEW.post) {
      setslug(urlState.key);
      setPostDate(urlState.date);
      setPostTitle(urlState.title);
    } else {
      setslug(null);
      setPostDate(null);
      setPostTitle(null);
    }
  }, [location, view]);

  return { collection, slug, postDate, postTitle, filters };
}

/**
 * Imperative method of the above for first-time load
 * location should be {useLocation } from react-router-dom
 */
export function getUrlState(location) {
  // e.g. /blog/photography/2019-12-11/test-post?filter1=value&filter2=value
  const [, , collection, date, urlTitle] = location.pathname.split("/");

  let key;
  let title;
  if (date && urlTitle) {
    title = urlDecodeStr(urlTitle);
    key = `${date.trim()}-${title}`;
  }
  const filters = queryString.parse(location.search);
  return { collection, key, date, title, filters };
}
