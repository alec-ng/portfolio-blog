import React from "react";

import ReactSidebar from "react-sidebar";
import SidebarLinks from './sidebar-links';
import ContentRenderer from './content-renderer';
import ContentHeader from '../components/content-header';

/**
 * UI composition component for photography section
 */

const mql = window.matchMedia(`(min-width: 800px)`);

class PhotographyLayout extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ReactSidebar sidebar={
            <SidebarLinks pageList={this.props.pageList} />
          }
            open={this.props.isSidebarOpen}
            docked={this.props.isSidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}>
          
          <ContentHeader />

          <div class="container">
            <ContentRenderer pageList={this.props.pageList}
                            dataMap={this.props.dataMap} />
          </div>
        </ReactSidebar>
      </div>
    );
  }
}

export default PhotographyLayout;
