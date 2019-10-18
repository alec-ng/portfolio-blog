import React from "react";

import ReactSidebar from "react-sidebar";
import SidebarLinks from './sidebar-links';

/**
 * Responsive mobile-friendly Sidebar container utilizing the 
 * npm package react-sidebar
 */
export default class Sidebar extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ReactSidebar sidebar={
            <SidebarLinks pageList={this.props.pageList} />
          }
            open={true}
            docked={true}
            children={<div></div>}>
        </ReactSidebar>
      </div>
    );
  }
}
