import React from "react";

import ReactSidebar from "react-sidebar";
import Sidebar from './sidebar';
import SidebarLinks from './sidebar-links';
import ContentRenderer from './content-renderer';
import ContentHeader from '../components/content-header';

/**
 * UI composition component for photography section
 */

// Large devices using Bootstrap responsive breakpoint
const mql = window.matchMedia(`(min-width: 992px)`);

class PhotographyLayout extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isSidebarDocked : mql.matches, // if on desktop, auto open sidebar
      isSidebarOpen: false, 
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.addListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ isSidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ 
      isSidebarDocked: mql.matches, 
      isSidebarOpen: false 
    });
  }

  render() {
    return (
      <div>
        <ReactSidebar sidebar={<Sidebar pageList={this.props.pageList} />}
                      open={this.state.isSidebarOpen}
                      docked={this.state.isSidebarDocked}
                      onSetOpen={this.onSetSidebarOpen}
                      styles={{ 
                        sidebar: { 
                          width: '250px' 
                        } 
                      }}>

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
