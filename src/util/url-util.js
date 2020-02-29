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
 * ASSUMPTION: string only contains alphanumeric characters, spaces, and apostrophes
 * returns back a version that is lowercase, spaces->hyphens, apostrophes encoded
 */
export function urlEncodeStr(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[']/g, "_");
}

/**
 * ASSUMPTION: string is the return value of urlEncodeStr() above
 * returns back a version where all hyphens are converted to spaces, apostrophes decoded,
 * and each word is capitalized
 */
export function urlDecodeStr(str) {
  return str
    .split("-")
    .map(str => {
      const uppercase = str.charAt(0).toUpperCase() + str.slice(1);
      return uppercase.replace(/_/g, `'`);
    })
    .join(" ");
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
