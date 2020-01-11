import React, { useState } from "react";
import { withAuthorization } from "../components/session";
import { ScrapbookCMS } from "../components/scrapbook-cms/scrapbook-cms";

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
    if (action === "create") {
      // create new cms-post, post, postData documents
      let batch = props.firebase.batch();
      let cmsPostRef = props.firebase.cmsPosts().doc(payload.id);
      batch.set(cmsPostRef, payload.cmsPost);
      let postRef = props.firebase.posts().doc(payload.id);
      batch.set(postRef, payload.cmsPost.post);
      let postDataRef = props.firebase.postData().doc(payload.id);
      batch.set(postDataRef, {});

      return new Promise((resolve, reject) => {
        batch
          .commit()
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    } else if (action === "update") {
      // determine if post or postdata or both needed
    } else if (action === "delete") {
      // create existing cms-post, post, postData documents
      let batch = props.firebase.batch();
      let cmsPostRef = props.firebase.cmsPosts().doc(payload.id);
      batch.delete(cmsPostRef);
      let postRef = props.firebase.posts().doc(payload.id);
      batch.delete(postRef);
      let postDataRef = props.firebase.postData().doc(payload.id);
      batch.delete(postDataRef);

      return new Promise((resolve, reject) => {
        batch
          .commit()
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  };

  // Could be derived off of a subset of data to feed in, e.g. trip reports vs photography
  // TODO: could also try altering after  onCMSAction?
  const key = "";

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container-fluid p-0">
          <ScrapbookCMS
            key={key}
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
