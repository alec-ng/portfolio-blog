import React, { useEffect, useState } from "react";
import { urlEncodeStr } from "../../../util/url-util";
import { StyledHr } from "../universal/filters-dialog";
import ButtonGroupInput from "../generic/button-group-input";

const urlMapFct = value => ({ label: value, key: urlEncodeStr(value) });

/**
 * Form with two inputs (single select button groups), with region being
 * dependent on the area
 */
export default function HikingFilterForm({ onInputChange, selected, posts }) {
  const [regionAreaMapping, regionVals] = useRegionData(posts);
  const areaVals = useAreaData(regionAreaMapping, selected);

  /**
   * Button input click, set corresponding filter
   */
  const onRegionSelect = key => {
    onInputChange({
      region: key,
      area: null // because area is dependent on region
    });
  };
  const onAreaSelect = key => {
    onInputChange({ area: key });
  };

  return (
    <>
      <div className="mb-4">
        <h1>Region</h1>
        <StyledHr />
        <ButtonGroupInput
          values={regionVals}
          onButtonClick={onRegionSelect}
          selected={selected.region}
          includeAll={true}
        />
      </div>
      <div>
        <h1>Area</h1>
        <StyledHr />
        <ButtonGroupInput
          values={areaVals}
          onButtonClick={onAreaSelect}
          selected={selected.area}
          includeAll={true}
        />
      </div>
    </>
  );
}

/**
 * Hook to extract all unique regions and lists of areas belonging to each region
 * from all published posts
 */
function useRegionData(posts) {
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

/**
 * Hook to determine the dependent list of area values according to
 * the selected region
 */
function useAreaData(regionAreaMapping, selected) {
  const [areaVals, setAreaVals] = useState([]);

  useEffect(() => {
    if (selected.region && regionAreaMapping[selected.region]) {
      setAreaVals(
        Array.from(regionAreaMapping[selected.region])
          .sort()
          .map(urlMapFct)
      );
    } else {
      setAreaVals([]);
    }
  }, [selected, regionAreaMapping]);

  return areaVals;
}
