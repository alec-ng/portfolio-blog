import React from "react";

import Enums from "../util/enums";
import Layout from "../components/photography-layout";

/**
 * IN THE FUTURE -- this should be merged with the layout page to do a query for only the relevant information to show
 *
 * Page level component for photography section
 * (TEMPORARY) Data layer component
 */
class Photography extends React.Component {
  constructor(props) {
    super(props);
    let pageTestData = this.getTestData_Pages();

    this.state = {
      pageList: pageTestData.pageList,
      dataMap: pageTestData.dataMap
    };
  }

  getTestData_Pages() {
    let data = [
      {
        label: "Test Page 1",
        id: "test-page-1",
        data: [
          {
            type: Enums.ELE_FULLWIDTH_IMG,
            src:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1200px-2010-kodiak-bear-1.jpg",
            text: {
              content: "I AM BEAR",
              style: { top: "3px" }
            }
          },
          {
            type: Enums.ELE_FULLWIDTH_IMG
          },
          {
            type: Enums.ELE_FULLWIDTH_VIDEO,
            src: "https://i.imgur.com/QLf1S85.mp4",
            text: {
              content: "Yeet Nepal",
              style: { top: "3px" }
            }
          }
        ]
      },
      {
        label: "Test Page 2",
        id: "test-page-2",
        data: [
          {
            type: Enums.ELE_FULLWIDTH_IMG,
            src:
              "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&w=1000&q=80",
            content: "Lazy Baer",
            text: {
              content: "Lazy ass bear",
              style: { top: "3px" }
            }
          }
        ]
      },
      {
        label: "Test Page 3",
        id: "test-page-3",
        data: [
          {
            type: Enums.ELE_FULLWIDTH_IMG,
            src:
              "https://www.sciencemag.org/sites/default/files/styles/inline__450w__no_aspect/public/bears_16x9.jpg?itok=Xt60oxlc",
            text: {
              content: "Arf",
              style: { top: "3px" }
            }
          }
        ]
      }
    ];

    // put into hash and an array (without data)
    let dataMap = {};
    let pageList = [];
    data.forEach(page => {
      dataMap[page.id] = page;
      pageList.push({
        label: page.label,
        id: page.id
      });
    });

    return {
      pageList: pageList,
      dataMap: dataMap
    };
  }

  render() {
    return (
      <div class="container-fluid p-0">
        <Layout pageList={this.state.pageList} dataMap={this.state.dataMap} />
      </div>
    );
  }
}

export default Photography;
