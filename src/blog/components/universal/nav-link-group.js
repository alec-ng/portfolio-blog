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
} from "../../util/constants";

/**
 * Renders a group of react-router-dom links depending on what
 * page is being shown
 */
export default function NavLinkGroup(props) {
  return (
    <>
      <Link to="/">
        <PersonOutlineOutlinedIcon /> About
      </Link>
      <br />
      <NavLink
        collection={COLLECTION_TRIPREPORTS}
        currentCollection={props.currentCollection}
        text={TripreportsText}
      />
      {/* 25/02/20: disable until future content is done */}
      {/* <NavLink
        collection={COLLECTION_TRAVELS}
        currentCollection={props.currentCollection}
        text={TravelText}
      />
      <br /> */}
    </>
  );
}

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
const NavLink = props => (
  <>
    {props.currentCollection === props.collection ? (
      <StyledHeavyText>{props.text}</StyledHeavyText>
    ) : (
      <Link to={`${PATH_BLOG}/${props.collection}`}>{props.text}</Link>
    )}
  </>
);
