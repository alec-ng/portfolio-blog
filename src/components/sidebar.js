import React from "react";
import SidebarLinks from './sidebar-links';
import {Link} from "react-router-dom";

import logo from '../assets/photography/sidebar-logo.jpg';
import styles from './sidebar.module.css';

/**
 * Sidebar main container. Lives in react-sidebar defined in the layout component
 */
export default function Sidebar(props) {
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div class="col">
          <img class="img-fluid" src={logo} />
        </div>
      </div>
      <div className="row py-5">
        <div class="col">
        <SidebarLinks pageList={props.pageList} />
        </div>
      </div>
      <div className="row py-3">
        <div class="col">
          <hr />
          <ul>
            <li><Link to="/">About</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
