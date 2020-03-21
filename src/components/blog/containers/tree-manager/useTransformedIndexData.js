import { useEffect, useState } from "react";
import { getKeyFromIndex } from "../../../../util/url-util";

/**
 * Given the full collection of a particular grouping of posts, return back
 * transformations of that data for utility and rendering purposes
 */
export default function useTransformedIndexData(postIndex) {
  const [idToPostMap, setIdToPostMap] = useState(null);
  const [keyToPostMap, setKeyToPostMap] = useState(null);

  useEffect(() => {
    if (!postIndex) {
      return;
    }
    let localIdDataMap = {};
    let localKeyDataMap = {};
    postIndex.forEach(post => {
      localIdDataMap[post.postDataId] = post;
      localKeyDataMap[getKeyFromIndex(post).toUpperCase()] = post;
    });
    setIdToPostMap(localIdDataMap);
    setKeyToPostMap(localKeyDataMap);
  }, [postIndex]);

  return {
    idToPostMap: idToPostMap,
    keyToPostMap: keyToPostMap
  };
}
