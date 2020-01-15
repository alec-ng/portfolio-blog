import React from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import { Link } from "react-router-dom";

const DEFAULT_LINE_HEIGHT = "25px";

/**
 * Renders a group of react-router-dom links depending on what
 * page is being shown
 */
export default function NavLinkGroup(props) {
  return (
    <div style={{ lineHeight: DEFAULT_LINE_HEIGHT }}>
      <Link to="/">
        <HomeOutlinedIcon /> Home
      </Link>
      <br />
      {props.pageName !== "tripreports" && (
        <>
          <Link to="/trip-reports">
            <FilterHdrOutlinedIcon /> Trip Reports
          </Link>
          <br />
        </>
      )}
      {props.pageName !== "photography" && (
        <>
          <Link to="/photography">
            <CameraAltOutlinedIcon /> Photography
          </Link>
          <br />
        </>
      )}
      {props.pageName !== "portfolio" && (
        <>
          <Link to="/portfolio">
            <WorkOutlineOutlinedIcon /> Portfolio
          </Link>
          <br />
        </>
      )}
    </div>
  );
}
