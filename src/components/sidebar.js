import React from "react";

import ReactSidebar from "react-sidebar";
import SidebarLinks from './sidebar-links';

// TODO: http://balloob.github.io/react-sidebar/example/
// TODO: https://github.com/balloob/react-sidebar

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
            docked={true}>
        </ReactSidebar>
      </div>
    );
  }
}
