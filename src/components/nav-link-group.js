import React from "react";
import styled from "styled-components";

import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";

import { Link } from "react-router-dom";
import {
  PATH_BLOG,
  COLLECTION_TRAVELS,
  COLLECTION_TRIPREPORTS
} from "./../util/constants";

const DEFAULT_LINE_HEIGHT = "25px";

const StyledStaticText = styled.b`
  font-weight: 700;
  color: rgb(255, 69, 0);
`;

const TravelText = (
  <>
    {" "}
    <PublicOutlinedIcon /> Travels{" "}
  </>
);
const TripreportsText = (
  <>
    {" "}
    <FilterHdrOutlinedIcon /> Trip Reports{" "}
  </>
);

function NavLink(props) {
  return (
    <>
      {props.currentCollection === props.collection ? (
        <StyledStaticText>{props.text}</StyledStaticText>
      ) : (
        <Link to={`${PATH_BLOG}/${props.collection}`}>{props.text}</Link>
      )}
    </>
  );
}

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
      <NavLink
        collection={COLLECTION_TRIPREPORTS}
        currentCollection={props.currentCollection}
        text={TripreportsText}
      />
      <br />
      <NavLink
        collection={COLLECTION_TRAVELS}
        currentCollection={props.currentCollection}
        text={TravelText}
      />
      <br />
    </div>
  );
}
