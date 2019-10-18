import React from "react";
import {
  useRouteMatch,
  Link
} from "react-router-dom";

import Sidebar from '../components/sidebar';

export default class Photography extends React.Component {

  // TODO: where to store pageList? How to efficiently pass it down?

  constructor(props) {
    super(props);
    let pageList = this.getTestData_Pages();

    this.state = {
      renderedPage: null,
      pageList : pageList,
    };
  }

  // on click, update rendered page
  handleLink = (e) => {
      let chosenId = e.currentTarget.id;
      this.setState({
        renderedPage: chosenId
      });
  }

  getTestData_Pages() {
    return [
      {
        label: 'Test Page 1',
        id: 'test-page-1'
      },
      {
        label: 'Test Page 2',
        id: 'test-page-2'
      },
      {
        label: 'Test Page 3',
        id: 'test-page-3'
      },
    ];
  }

  render() {
    return(
      <div>
        <h1>Photography Page</h1>
        <Sidebar pageList={this.state.pageList}
                 pageLinkClickCb={(e) => this.handleLink(e)} />
      </div>
    )
  }

}