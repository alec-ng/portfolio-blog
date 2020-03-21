import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { urlEncodeStr } from "../../../util/url-util";

import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";

/**
 * Shows a trip report's custom metadata
 * onClick, initiate a state push to update filters
 */
export default function TripReportData({ postMetadata }) {
  const pathname = useLocation().pathname;
  const history = useHistory();
  const urlRegion = urlEncodeStr(postMetadata.region);
  const urlArea = urlEncodeStr(postMetadata.area);

  // programmatic navigation to preserve SPA UX
  function onClick(e) {
    e.preventDefault();
    history.push(e.currentTarget.dataset.href);
  }

  const regionUrl = `${pathname}?region=${urlRegion}`;
  const areaUrl = `${pathname}?region=${urlRegion}&area=${urlArea}`;

  return (
    <div className="brandywine-width_large mx-auto mb-4">
      <a onClick={onClick} href="#" data-href={regionUrl}>
        <PublicOutlinedIcon /> {postMetadata.region}
      </a>
      <br />
      <a onClick={onClick} href="#" data-href={areaUrl}>
        <MapOutlinedIcon /> {postMetadata.area}
      </a>
    </div>
  );
}
