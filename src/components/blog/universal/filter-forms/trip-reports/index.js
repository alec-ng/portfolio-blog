import React from "react";
import styled from "styled-components";
import useRegionData from "./useRegionData";
import useAreaData from "./useAreaData";
import ButtonGroupInput from "../../../generic/button-group-input";

/**
 * Form with two inputs (single select button groups), with region being
 * dependent on the area
 */
export default function TripReportForm({ onInputChange, chosenValues, posts }) {
  const [regionAreaMapping, regionVals] = useRegionData(posts);
  const areaVals = useAreaData(regionAreaMapping, chosenValues);

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
          selected={chosenValues.region}
          includeAll={true}
        />
      </div>
      <div>
        <h1>Area</h1>
        <StyledHr />
        <ButtonGroupInput
          values={areaVals}
          onButtonClick={onAreaSelect}
          selected={chosenValues.area}
          includeAll={true}
        />
      </div>
    </>
  );
}

// ---------- STYLES

const StyledHr = styled.hr`
  border-color: rgba(0, 0, 0, 0.87);
  margin-top: 0;
`;
