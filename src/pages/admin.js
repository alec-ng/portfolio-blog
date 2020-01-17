import React, { useState } from "react";
import styled from "styled-components";
import { withAuthorization } from "../components/session";
import { ScrapbookCMS } from "../components/scrapbook-cms/scrapbook-cms";
import {
  createPost,
  deletePost,
  publish,
  unpublish,
  updatePost,
  PHOTOGRAPHY_KEY,
  TRIPREPORT_KEY
} from "../util/firebase-post-util";

import Image from "../components/scrapbook-editor/plugins/image/index";
import Markdown from "../components/scrapbook-editor/plugins/markdown/index";
import CoverPhoto from "../components/scrapbook-editor/plugins/cover-photo/index";
import Spacer from "../components/scrapbook-editor/plugins/spacer/index";
import Carousel from "../components/scrapbook-editor/plugins/carousel/index";
import Video from "../components/scrapbook-editor/plugins/video/index";

const InitContainer = styled.div`
  display: flex;
  text-align: center;
  height: 80vh;
  justify-content: center;
  flex-direction: column;
`;

const Admin = function(props) {
  const [loading, setLoading] = useState(true);
  const [cmsPostData, setCmsPostData] = useState(null);
  const [postGroup, setPostGroup] = useState(null);

  // read all cms-posts in from database that match post grouping chosen
  function onPostGroupClick(e) {
    let postGroup = e.currentTarget.dataset.post;
    setPostGroup(postGroup);

    let data = {};
    props.firebase
      .cmsPosts()
      .where("post.grouping", "==", e.currentTarget.dataset.post)
      .get()
      .then(snapshot => {
        // create mapping between each id and and the cms-post
        snapshot.forEach(doc => {
          data[doc.id] = doc.data();
        });
        setCmsPostData(data);
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // fired whenever the editor needs to synchronize CRUD actions with the database
  // this should return a promise.
  const onCMSAction = function(action, payload) {
    switch (action) {
      case "create":
        return createPost(payload, props.firebase, postGroup);
      case "update":
        return updatePost(payload, props.firebase, postGroup);
      case "publish":
        return publish(payload, props.firebase, postGroup);
      case "unpublish":
        return unpublish(payload, props.firebase, postGroup);
      case "delete":
        return deletePost(payload, props.firebase);
      default:
        throw new Error(`Unrecognized action: ${action}`);
    }
  };

  return (
    <>
      {!postGroup && (
        <InitContainer>
          <h3>Select a post grouping to work with</h3>
          <button
            className="btn btn-info"
            type="button"
            onClick={onPostGroupClick}
            data-post={PHOTOGRAPHY_KEY}
          >
            Photography
          </button>
          <button
            className="btn btn-info"
            type="button"
            onClick={onPostGroupClick}
            data-post={TRIPREPORT_KEY}
          >
            Trip Reports
          </button>
        </InitContainer>
      )}
      {postGroup && (
        <>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="container-fluid p-0">
              <ScrapbookCMS
                onAction={onCMSAction}
                data={cmsPostData}
                plugins={plugins}
                showPluginDescription={false}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

const condition = authUser =>
  authUser && authUser.email === process.env.REACT_APP_ADMIN_EMAIL;
export default withAuthorization(condition)(Admin);

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];
