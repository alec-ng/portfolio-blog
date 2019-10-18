import React from "react";
import {
  useRouteMatch,
  NavLink
} from "react-router-dom";

import './sidebar-links.css';

export default function SidebarLinks(props) {
  let { path, url } = useRouteMatch();

  const listElements = props.pageList
    ? props.pageList.map((page) => 
        <li>
          <NavLink id={page.id} 
                onClick={props.pageLinkClickCb} 
                activeClassName="activeNavLink"
                to={`${url}/${page.id}`}>
            {page.label}
          </NavLink>
        </li>
      )
    : [];

  return (
    <ul>
      {listElements}
    </ul>
  );
}
