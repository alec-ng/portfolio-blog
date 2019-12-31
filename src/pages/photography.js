import React, { useState } from "react";
import Layout from "../components/photography-layout";
import uuidv1 from "uuid/v1";

/**
 * IN THE FUTURE -- this should be merged with the layout page to do a query for only the relevant information to show
 *
 * Page level component for photography section
 * (TEMPORARY) Data layer component
 */
export default function Photography(props) {
  const { pageList, dataMap } = getTestData();

  return (
    <div className="container-fluid p-0">
      <Layout pageList={pageList} dataMap={dataMap} />
    </div>
  );
}

const getTestData = function() {
  let data = [FIRST_TEST_PAGE];
  let dataMap = {};
  let pageList = [];

  data.forEach(page => {
    let uuid = uuidv1();
    dataMap[uuid] = page;
    pageList.push({
      label: page.header.title || page.header.subTitle || "",
      id: uuid
    });
  });

  return {
    pageList: pageList,
    dataMap: dataMap
  };
};

const header1 = `{"title":"Test","subTitle":"My Test","displayDate1":"2019-12-06","displayDate2":"2019-12-13"}`;
const pageMetadata1 = `{"createdDate":"2019-12-29","lastModified":"2019-12-30T02:20:48.932Z","tags":[]}`;
const blocks1 = `[{"name":"image","baseAttrs":{"size":"large","urlSource":"https://i.imgur.com/riz9PNB.jpg"},"variation":"image_caption","variationAttrs":{"image_default":{},"image_caption":{"primaryText":"This is my first test","secondaryText":"This is my secondary test"}},"uuid":"66f540d0-2aa9-11ea-b29a-41afb9d7311f","isFocused":false},{"name":"markdown","baseAttrs":{"source":"Damn why won't this markdown work\\n\\nIt's so hard to get this to render correectly"},"variation":"markdown_default","variationAttrs":{"markdown_default":{}},"uuid":"8216e6c0-2aa9-11ea-b29a-41afb9d7311f","isFocused":true}]`;

const FIRST_TEST_PAGE = {
  header: JSON.parse(header1),
  blocks: JSON.parse(blocks1),
  pageMetadata: JSON.parse(pageMetadata1)
};
