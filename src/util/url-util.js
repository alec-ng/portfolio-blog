// Given the current pathname from useLocation().pathname,
// generate a key used to find the corresponding post
export function getKeyFromLocation(pathname) {
  if (!pathname) {
    console.warning("The pathname provided was empty");
    return "";
  }
  const [, page, date, title] = pathname.split("/"); // e.g. /photography/2019-12-11/Test-Post
  if (!date || !title) {
    return;
  }

  let urlTitle = title.trim().replace(/-/g, " "); // hyphens converted back to spaces
  return `${date.trim()}-${urlTitle}`;
}

// Given an array element from postIndex.index, generate a unique pathname
// used for redirect
export function getPathnameFromIndex(postIndexElement, page) {
  if (!postIndexElement || !postIndexElement.title || !postIndexElement.date) {
    console.error(`Invalid post index element provided: ${postIndexElement}`);
    return;
  }

  // title restrictions = alphanumeric and spaces
  // just convert spaces to hyphens to make it url friendly
  let title = postIndexElement.title.trim().replace(/ /g, "-");

  return `${page}/${postIndexElement.date.trim()}/${title}`;
}

// Given an array element from postIndex.index, generate a key from its
// date and title used for internal id purposes
export function getKeyFromIndex(postIndexElement) {
  if (!postIndexElement || !postIndexElement.title || !postIndexElement.date) {
    console.error(`Invalid post index element provided: ${postIndexElement}`);
    return;
  }
  return `${postIndexElement.date}-${postIndexElement.title}`;
}
