import { useState, useEffect } from "react";
import { urlEncodeStr } from "../../../../util/url-util";

/**
 * Hook to extract all unique regions and lists of areas belonging to each region
 * from all published posts
 */
export default function useRegionData(posts) {
  const [regionAreaMapping, setRegionAreaMapping] = useState({});
  const [regionVals, setRegionVals] = useState([]);

  useEffect(() => {
    let regionSet = new Set();
    let mapping = {};
    for (let post of posts) {
      if (!post.region) {
        continue;
      }
      regionSet.add(post.region);
      const regionKey = urlEncodeStr(post.region);
      if (!mapping[regionKey]) {
        mapping[regionKey] = new Set();
      }
      if (post.area) {
        mapping[regionKey].add(post.area);
      }
    }
    setRegionAreaMapping(mapping);
    setRegionVals(
      Array.from(regionSet)
        .sort()
        .map(urlMapFct)
    );
  }, [posts]);

  return [regionAreaMapping, regionVals];
}

const urlMapFct = value => ({ label: value, key: urlEncodeStr(value) });
