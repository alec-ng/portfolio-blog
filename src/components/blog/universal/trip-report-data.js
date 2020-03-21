import React from "react";
import { useLocation } from "react-router-dom";

import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";

/**
 * Shows a trip report's custom metadata
 * onClick, initiate a state push to update filters
 */
export default function TripReportData({ post }) {
  const pathname = useLocation().pathname;

  const regionUrl = `${pathname}?region=${post.region}`;
  const areaUrl = `${pathname}?area=${post.area}`;

  return (
    <div>
      <a href={regionUrl}>
        <PublicOutlinedIcon /> Region /
      </a>
      <a href={areaUrl}>
        <MapOutlinedIcon /> Area /
      </a>
    </div>
  );
}
