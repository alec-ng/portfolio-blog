import { getSlug } from "./url-util";

/**
 * Itereate over a set of published posts and return two mappings,
 * one for db-id -> post metadata, and slug -> post metadata
 */
export function getPostMappings(publishedPosts) {
  if (!publishedPosts) {
    return {};
  }
  let idToPostMap = {};
  let slugToPostMap = {};
  publishedPosts.forEach(post => {
    idToPostMap[post.postDataId] = post;
    const slug = getSlug(post.title, post.date);
    slugToPostMap[slug] = post;
  });
  return { idToPostMap, slugToPostMap };
}
