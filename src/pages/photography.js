import React from "react";

import Layout from '../components/photography-layout';

/**
 * Page level component for photography section
 * Data layer component
 */
class Photography extends React.Component {

  constructor(props) {
    super(props);
    let pageTestData = this.getTestData_Pages();

    this.state = {
      pageList: pageTestData.pageList,
      dataMap: pageTestData.dataMap,
    };
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
        <Layout pageList={this.state.pageList}
                dataMap={this.state.dataMap} />
      </div>
    )
  }

}

export default Photography;