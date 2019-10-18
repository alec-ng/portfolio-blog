import React from "react";
import {
  useRouteMatch,
  Link
} from "react-router-dom";

import SidebarLinks from './sidebar-links';

// TODO: http://balloob.github.io/react-sidebar/example/
// TODO: https://github.com/balloob/react-sidebar

export default class Sidebar extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SidebarLinks pageList={this.props.pageList} 
                    pageLinkClickCb={(e) => this.props.pageLinkClickCb(e)} />
    );
  }
}
