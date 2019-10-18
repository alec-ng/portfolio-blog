import React from "react";
import {
  useRouteMatch,
  NavLink
} from "react-router-dom";

import './sidebar-links.css';

/**
 * Renders a list of NavLinks 
 * 
 * @param props.pageList - uses the id property of each list element objects
 */
export default function SidebarLinks(props) {
  // create list of navlinks out of pages
  let { path, url } = useRouteMatch();
  const listElements = props.pageList
    ? props.pageList.map((page) => 
        <li key={page.id}>
          <NavLink id={page.id} 
                activeClassName="activeNavLink"
                to={`${url}/${page.id}`}>
            {page.label}
          </NavLink>
        </li>
      )
    : [];

  return (
    <div>
      <ul>
        {listElements}
      </ul>
    </div>
  );
}
