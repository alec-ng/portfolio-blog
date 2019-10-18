import React from "react";
import {
  useRouteMatch,
  Link
} from "react-router-dom";

import Sidebar from '../components/sidebar';
import ContentRenderer from '../components/content-renderer';

export default class Photography extends React.Component {

  // TODO: where to store pageList? How to efficiently pass it down?

  constructor(props) {
    super(props);
    let pageTestData = this.getTestData_Pages();

    // get initial chosen page
    let firstId = pageTestData.pageList[0].id;

    this.state = {
      chosenPage: pageTestData.dataMap[firstId],
      pageList : pageTestData.pageList,
      dataMap : pageTestData.dataMap,
    };
  }

  // on click, update rendered page
  handleLink = (e) => {
      let chosenId = e.currentTarget.id;
      let dataToRender = this.state.dataMap[chosenId];
      this.setState({
        chosenPage: dataToRender
      });
  }

  getTestData_Pages() {
    let data = [
      {
        label: 'Test Page 1',
        id: 'test-page-1',
        data: [
          {
            type: 'FULL_WIDTH_IMG',
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1200px-2010-kodiak-bear-1.jpg',
            text: 'I am BEAR'
          }
        ]
      },
      {
        label: 'Test Page 2',
        id: 'test-page-2',
        data: [
          {
            type: 'FULL_WIDTH_IMG',
            src: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&w=1000&q=80',
            text: 'Lazy Baer'
          }
        ]
      },
      {
        label: 'Test Page 3',
        id: 'test-page-3',
        data: [
          {
            type: 'FULL_WIDTH_IMG',
            src: 'https://www.sciencemag.org/sites/default/files/styles/inline__450w__no_aspect/public/bears_16x9.jpg?itok=Xt60oxlc',
            text: 'Arf'
          }
        ]
      },
    ];

    // put into hash and an array (without data)
    let dataMap = {};
    let pageList = [];
    data.forEach((page) => {
      dataMap[page.id] = page;
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

        <ContentRenderer contentData={this.state.chosenPage} />
      </div>
    )
  }

}