import { getKeyFromIndex } from "./url-util";

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
