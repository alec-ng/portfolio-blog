import React, { useState } from "react";
import { withAuthorization } from "../components/session";
import { ScrapbookCMS } from "../components/scrapbook-cms/scrapbook-cms";
import {
  createPost,
  deletePost,
  publish,
  unpublish,
  updatePost
} from "./admin-util";

import Image from "../components/scrapbook-editor/plugins/image/index";
import Markdown from "../components/scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "../components/scrapbook-editor/plugins/cover-photo/index";
import Spacer from "../components/scrapbook-editor/plugins/spacer/index";
import Carousel from "../components/scrapbook-editor/plugins/carousel/index";
import Video from "../components/scrapbook-editor/plugins/video/index";

const Admin = function(props) {
  const [loading, setLoading] = useState(true);

  // read all cms-posts in from database
  // create mapping between each id and and the cms-post
  let data = {};
  props.firebase
    .cmsPosts()
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        data[doc.id] = doc.data();
      });
    })
    .catch(error => {
      alert(error);
    })
    .finally(() => {
      setLoading(false);
    });

  // fired whenever the editor needs to synchronize CRUD actions with the database
  // this should return a promise.
  const onCMSAction = function(action, payload) {
    switch (action) {
      case "create":
        return createPost(payload, props.firebase);
      case "update":
        return updatePost(payload, props.firebase);
      case "publish":
        return publish(payload, props.firebase);
      case "unpublish":
        return unpublish(payload, props.firebase);
      case "delete":
        return deletePost(payload, props.firebase);
      default:
        throw new Error(`Unrecognized action: ${action}`);
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container-fluid p-0">
          <ScrapbookCMS
            onAction={onCMSAction}
            data={data}
            plugins={plugins}
            showPluginDescription={false}
          />
        </div>
      )}
    </>
  );
};

const condition = authUser =>
  authUser && authUser.email === process.env.REACT_APP_ADMIN_EMAIL;
export default withAuthorization(condition)(Admin);

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];
