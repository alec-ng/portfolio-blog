import React from "react";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";

/**
 * Renderes readonly trip report metdata
 */
export default function TripReportData({ metadata }) {
  return (
    <div className="brandywine-width_large brandywine-responsive-x-padding mx-auto mb-4">
      <div>
        <span style={{ color: "rgb(255, 69, 0)" }}>
          <PublicOutlinedIcon />
        </span>
        &nbsp;{metadata.region}
      </div>
      <div>
        <span style={{ color: "rgb(255, 69, 0)" }}>
          <RoomOutlinedIcon />
        </span>
        &nbsp;{metadata.area}
      </div>
    </div>
  );
}
