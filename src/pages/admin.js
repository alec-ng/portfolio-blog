import React from "react";
import { withAuthorization } from "../components/session";
import { ScrapbookCMS } from "../components/scrapbook-cms/scrapbook-cms";

import Image from "../components/scrapbook-editor/plugins/image/index";
import Markdown from "../components/scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "../components/scrapbook-editor/plugins/cover-photo/index";
import Spacer from "../components/scrapbook-editor/plugins/spacer/index";
import Carousel from "../components/scrapbook-editor/plugins/carousel/index";
import Video from "../components/scrapbook-editor/plugins/video/index";

const Admin = function(props) {
  // On initialization (once), read all post and postContent data from firebase
  // posts.length should === postSData.length
  let posts = [];
  let postData = [];

  // create data mapping between each post's key and its post/postData documents
  let data = {};
  posts.forEach(post => {
    data[post.id] = {
      post: post
    };
  });
  postData.forEach(postData => {
    data[postData.post].postData = postData;
  });

  // fired whenever the editor needs to synchronize CRUD actions with the database
  // this should return a promise.
  const onCMSAction = function(action, payload) {
    switch (action) {
      case "create":
        // TODO: batch write for CMSPost as well
        return new Promise((resolve, reject) => {
          props.firebase
            .posts()
            .doc(payload.id)
            .set(payload.post)
            .then(() => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
          // TODO: Create empty postData, just with
        });
      case "update":
        // determine if post or postdata or both needed
        break;
      case "delete":
        // delete both post and postdata
        break;
    }
  };

  // Could be derived off of a subset of data to feed in, e.g. trip reports vs photography
  // TODO: could also try altering after  onCMSAction?
  const key = "";

  return (
    <div className="container-fluid p-0">
      <ScrapbookCMS
        key={key}
        onAction={onCMSAction}
        data={data}
        plugins={plugins}
        showPluginDescription={false}
      />
    </div>
  );
};

const condition = authUser =>
  authUser && authUser.email === process.env.REACT_APP_ADMIN_EMAIL;
export default withAuthorization(condition)(Admin);

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

const samplePosts = [
  {
    id: "2019-05-11-Nepal",
    title: "Nepal",
    date: "2019-05-11"
  },
  {
    id: "2019-05-15-Juan de Fuca",
    title: "Juan de Fuca",
    date: "2019-05-15"
  },
  {
    id: "2016-01-01-Slalok Mountain",
    title: "Slalok Mountain",
    date: "2016-01-01"
  },
  {
    id: "2016-06-14-Rainbow Mountain",
    title: "Rainbow Mountain",
    date: "2016-06-14"
  }
];

const samplePostData = [
  {
    post: "2019-05-11-Nepal",
    header: { title: "Nepal" },
    blocks: []
  },
  {
    post: "2019-05-15-Juan de Fuca",
    header: { title: "Juan de FUca" },
    blocks: []
  },
  {
    post: "2016-01-01-Slalok Mountain",
    header: { title: "Slalok mountain" },
    blocks: []
  },
  {
    post: "2016-06-14-Rainbow Mountain",
    header: { title: "Rainbow Mountain" },
    blocks: []
  }
];
