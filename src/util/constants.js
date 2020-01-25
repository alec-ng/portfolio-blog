/**
 * post grouping labels used in url
 */
export const COLLECTION_TRAVELS = "travels";
export const COLLECTION_TRIPREPORTS = "trip-reports";
export const VALID_COLLECTIONS = [COLLECTION_TRAVELS, COLLECTION_TRIPREPORTS];

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

export const PATH_BLOG = "/blog";
