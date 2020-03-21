import React from "react";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";

/**
 * Renderes readonly trip report metdata
 */
export default function TripReportData({ postMetadata }) {
  return (
    <div className="brandywine-width_large mx-auto mb-4">
      <div>
        <span style={{ color: "rgb(255, 69, 0)" }}>
          <PublicOutlinedIcon />
        </span>
        &nbsp;{postMetadata.region}
      </div>
      <div>
        <span style={{ color: "rgb(255, 69, 0)" }}>
          <MapOutlinedIcon />
        </span>
        &nbsp;{postMetadata.area}
      </div>
    </div>
  );
}
