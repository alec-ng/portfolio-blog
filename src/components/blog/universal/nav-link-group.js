import React from "react";
import { Link } from "react-router-dom";
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";

import { StyledHeavyText } from "./styled-sidebar-elements";
import {
  PATH_BLOG,
  COLLECTION_TRAVELS,
  COLLECTION_TRIPREPORTS
} from "../../../util/constants";

const DEFAULT_LINE_HEIGHT = "25px";
const TravelText = (
  <>
    <PublicOutlinedIcon /> Travels
  </>
);
const TripreportsText = (
  <>
    <FilterHdrOutlinedIcon /> Trip Reports
  </>
);

/**
 * Renders a group of react-router-dom links depending on what
 * page is being shown
 */
export default function NavLinkGroup(props) {
  return (
    <div style={{ lineHeight: DEFAULT_LINE_HEIGHT }}>
      <Link to="/">
        <PersonOutlineOutlinedIcon /> About
      </Link>
      <br />
      <NavLink
        collection={COLLECTION_TRIPREPORTS}
        currentCollection={props.currentCollection}
        text={TripreportsText}
      />
      <br />
      {/* 25/02/20: disable until more content is */}
      {/* <NavLink
        collection={COLLECTION_TRAVELS}
        currentCollection={props.currentCollection}
        text={TravelText}
      />
      <br /> */}
    </div>
  );
}

function NavLink(props) {
  return (
    <>
      {props.currentCollection === props.collection ? (
        <StyledHeavyText>{props.text}</StyledHeavyText>
      ) : (
        <Link to={`${PATH_BLOG}/${props.collection}`}>{props.text}</Link>
      )}
    </>
  );
}
