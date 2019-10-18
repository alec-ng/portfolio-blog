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

    let pageTestData = this.getTestData_Pages();

    let pageList = pageTestData.pageList;

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
    let data = [
      {
        label: 'Test Page 1',
        id: 'test-page-1',
        data: 'Test Data'
      },
      {
        label: 'Test Page 2',
        id: 'test-page-2',
        data: 'Test Data'
      },
      {
        label: 'Test Page 3',
        id: 'test-page-3',
        data: 'Test Data'
      },
    ];

    // put into hash and an array (without data)
    let dataMap = {};
    let pageList = [];
    data.forEach((page) => {
      dataMap[page.id] = {
        data: page.data,
        label: page.label
      }
      pageList.push({
        label: page.label,
        id: page.id
      });
    });

    return {
      pageList: pageList,
      dataMap: dataMap
    }
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