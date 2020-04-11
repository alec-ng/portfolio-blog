/**
 * Generates an all caps slug for case insensitive usage
 */
export function getSlug(title, date) {
  const encodedTitle = urlDecodeStr(title);
  return `${date}-${encodedTitle}`.toUpperCase();
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
 * Returns a relative path to match the "map" sub app route
 */
export function constructMapPath(location) {
  let mapUrl = "/blog/map";
  if (location) {
    mapUrl += location.search;
  }
  return mapUrl;
}

/*
 * Returns a relative path to match the "view" sub app route
 */
export function constructViewPath(date, title, search) {
  let viewUrl = "/blog/view/";
  if (date && title) {
    viewUrl += `${date}/${urlEncodeStr(title)}`;
  }
  if (search) {
    viewUrl += search;
  }
  return viewUrl;
}
