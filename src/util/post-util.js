import { getKeyFromIndex } from "./url-util";

/**
 * Itereate over a set of published posts and return two mappings,
 * one for db-id -> post metadata, and slug -> post metadata
 */
export function getPostMappings(publishedPosts) {
  if (!publishedPosts) {
    return {};
  }
  let idToPostMap = {};
  let keyToPostMap = {};
  publishedPosts.forEach(post => {
    idToPostMap[post.postDataId] = post;
    keyToPostMap[getKeyFromIndex(post).toUpperCase()] = post;
  });
  return { idToPostMap, keyToPostMap };
}
