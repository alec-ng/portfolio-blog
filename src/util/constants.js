/**
 * post grouping labels used in url
 */
export const COLLECTION_TRAVELS = "travels";
export const COLLECTION_TRIPREPORTS = "trip-reports";
export const VALID_COLLECTIONS = [
  COLLECTION_TRIPREPORTS
  // COLLECTION_TRAVELS, disabled 25/02/20
];

/**
 * Firebase constants for post.grouping field
 */
export const GROUPING_TRAVEL = "photography";
export const GROUPING_TRIPREPORTS = "tripreports";

/**
 * maps the post grouping labels above to the firebase collections actually used
 */
export function getIndexRef(collection, firebase) {
  switch (collection) {
    case COLLECTION_TRAVELS:
      return firebase.photographyIndex();
    case COLLECTION_TRIPREPORTS:
      return firebase.tripreportIndex();
    default:
      console.error(`Unrecognized collection: ${collection}`);
      return;
  }
}

/**
 * views
 */
export const APP_VIEW = {
  post: "post",
  map: "map"
};

/**
 * url paths
 */
export const PATH_BLOG = "/blog";
export const VIEW_PATHS = {
  [APP_VIEW.post]: `${PATH_BLOG}/${COLLECTION_TRIPREPORTS}`,
  [APP_VIEW.map]: `${PATH_BLOG}/${COLLECTION_TRIPREPORTS}/map`
};
