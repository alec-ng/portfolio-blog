import { PATH_BLOG } from "./constants";
const queryString = require("query-string");

/**
 * Given an array element from postIndex.index, generate a key from its
 * date and title used for internal id purposes
 */
export function getKeyFromIndex(postIndexElement) {
  return `${postIndexElement.date}-${postIndexElement.title}`;
}

/**
 * ASSUMPTION: string only contains alphanumeric characters and spaces
 * returns back a version where all spaces are hyphens, and all lower case
 */
export function urlEncodeStr(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/ /g, "-");
}

/**
 * ASSUMPTION: string is the return value of urlEncodeStr() above
 * returns back a version where all hyphens are converted to spaces, and if the string has
 * multiple words, each word is capitalized
 */
export function urlDecodeStr(str) {
  const strList = str.split("-");
  const capitalizedStrList = strList.map(
    str => str.charAt(0).toUpperCase() + str.slice(1)
  );
  return capitalizedStrList.join(" ");
}

/**
 * Returns a relative path to be used to navigate to with history()
 */
export function constructPath(collection, date, title, filters) {
  let path = `${PATH_BLOG}/${collection}/`;
  if (date && title) {
    path += `${date}/${urlEncodeStr(title)}`;
  }
  if (filters) {
    path += `?${queryString.stringify(filters)}`;
  }
  return path;
}
