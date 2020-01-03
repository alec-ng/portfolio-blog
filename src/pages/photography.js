import React, { useState } from "react";
import Layout from "../components/photography-layout";

/**
 * Page level component for photography section
 * (TEMPORARY) Data layer component
 */
export default function Photography(props) {
  const { pageList, dataMap } = getTestData();
  const { isLoading, setIsLoading } = useState(true); // TODO: implement

  return (
    <div className="container-fluid p-0">
      <Layout pageList={pageList} dataMap={dataMap} />
    </div>
  );
}

/**
 * generates pageList and dataMap
 */
const getTestData = function() {
  let dataMap = {};
  let pageList = [];

  // generate a unique ID for each page. In this case, it should be the title
  // The title is used as an ID for photography. If a duplicate is detected, omit it
  // Assume that TItle is always populated and required
  TEST_DATA.forEach(page => {
    if (!page.header.title) {
      console.log(`No title was found for this page: ${page}`);
      return;
    }

    let pageId = page.header.title.toLowerCase().replace(/ /g, "-");
    if (dataMap[pageId]) {
      console.log("Duplicate page detected ----");
      console.log(`Original page: ${dataMap[pageId].header}`);
      console.log(`Duplicate page: ${page.header}`);
      console.log(
        `The duplicate page will be skipped and will not be rendered.`
      );
      return;
    }

    dataMap[pageId] = page;
    pageList.push({
      label: page.header.title,
      id: pageId
    });
  });

  return {
    pageList: pageList,
    dataMap: dataMap
  };
};

/**
 * Expect format in db to be stringified JSON, and data to provide to scrapbook-editor to be parsed
 */
const header1 = `{"title":"Test","subTitle":"My Test","displayDate1":"2019-12-06","displayDate2":"2019-12-13"}`;
const pageMetadata1 = `{"createdDate":"2019-12-29","lastModified":"2019-12-30T02:20:48.932Z","tags":[]}`;
const blocks1 = `[{"name":"image","baseAttrs":{"size":"large","urlSource":"https://i.imgur.com/riz9PNB.jpg"},"variation":"image_caption","variationAttrs":{"image_default":{},"image_caption":{"primaryText":"This is my first test","secondaryText":"This is my secondary test"}},"uuid":"66f540d0-2aa9-11ea-b29a-41afb9d7311f","isFocused":false},{"name":"markdown","baseAttrs":{"source":"Damn why won't this markdown work\\n\\nIt's so hard to get this to render correectly"},"variation":"markdown_default","variationAttrs":{"markdown_default":{}},"uuid":"8216e6c0-2aa9-11ea-b29a-41afb9d7311f","isFocused":true}]`;

const FIRST_TEST_PAGE = {
  header: JSON.parse(header1),
  blocks: JSON.parse(blocks1),
  pageMetadata: JSON.parse(pageMetadata1)
};

const header2 = `{"title":"My Other Test Page","subTitle":"Let's see how this one turns out","displayDate1":null,"displayDate2":null}`;
const pageMetadata2 = `{"createdDate":"2019-12-31","lastModified":"2019-12-31T18:26:16.325Z","tags":[]}`;
const blocks2 = `[{"name":"markdown","baseAttrs":{"source":"# Harhar\n## Harhar\n### Har\n\n"},"variation":"markdown_default","variationAttrs":{"markdown_default":{}}},{"name":"image","baseAttrs":{"size":"large","urlSource":"https://i.imgur.com/KOBT4nk.jpg"},"variation":"image_default","variationAttrs":{"image_default":{}}}]`;

const SECOND_TEST_PAGE = {
  header: JSON.parse(header2),
  blocks: JSON.parse(blocks2.replace(/\n/g, "\\n")),
  pageMetadata: JSON.parse(pageMetadata2)
};

const TEST_DATA = [FIRST_TEST_PAGE, SECOND_TEST_PAGE];
