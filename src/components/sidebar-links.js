import React from "react";
import {
  useRouteMatch,
  Link
} from "react-router-dom";

export default function SidebarLinks(props) {
  let { path, url } = useRouteMatch();

  const listElements = props.pageList
    ? props.pageList.map((page) => 
        <li>
          <Link id={page.id} 
                onClick={props.pageLinkClickCb} 
                to={`${url}/${page.id}`}>
            {page.label}
          </Link>
        </li>
      )
    : [];

  return (
    <ul>
      {listElements}
    </ul>
  );
}
