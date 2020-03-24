import { useState, useEffect } from "react";
import { urlEncodeStr } from "../../../../../util/url-util";

/**
 * Hook to determine the dependent list of area values according to
 * the selected region
 */
export default function useAreaData(regionAreaMapping, chosenValues) {
  const [areaVals, setAreaVals] = useState([]);

  useEffect(() => {
    if (chosenValues.region && regionAreaMapping[chosenValues.region]) {
      setAreaVals(
        Array.from(regionAreaMapping[chosenValues.region])
          .sort()
          .map(urlMapFct)
      );
    } else {
      setAreaVals([]);
    }
  }, [chosenValues, regionAreaMapping]);

  return areaVals;
}

const urlMapFct = value => ({ label: value, key: urlEncodeStr(value) });
