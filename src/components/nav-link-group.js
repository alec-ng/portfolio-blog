import React from "react";
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
        <WorkOutlineOutlinedIcon /> Portfolio
      </Link>
      <br />
      {props.pageName !== "tripreports" && (
        <>
          <Link to="/blog/tripreports">
            <FilterHdrOutlinedIcon /> Trip Reports
          </Link>
          <br />
        </>
      )}
      {props.pageName !== "photography" && (
        <>
          <Link to="/blog/photography">
            <CameraAltOutlinedIcon /> Photography
          </Link>
          <br />
        </>
      )}
    </div>
  );
}
