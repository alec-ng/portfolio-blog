import { urlEncodeStr } from "../../../util/url-util";

/**
 * From the given list of published posts, returns
 * (1) mapping of { region -> Set(area) }
 * (2) set of unique regions {label, key}
 */
export function getRegionData(posts) {
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

  const values = Array.from(regionSet)
    .sort()
    .map(urlMapFct);

  return [mapping, values];
}

/**
 * Given the mapping returned from getRegionData() and a region,
 * returns a list of matching areas [ {label, key} ]
 */
export function getAreaData(regionAreaMapping, region) {
  return region && regionAreaMapping[region]
    ? Array.from(regionAreaMapping[region])
        .sort()
        .map(urlMapFct)
    : [];
}

const urlMapFct = value => ({ label: value, key: urlEncodeStr(value) });
