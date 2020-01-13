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

function deletePost(payload, firebase) {
  let batch = firebase.batch();
  batch.delete(firebase.cmsPosts().doc(payload.id));
  batch.delete(firebase.posts().doc(payload.id));
  batch.delete(firebase.postData().doc(payload.id));
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

function publish(payload, firebase) {
  return new Promise((resolve, reject) => {
    payload.cmsPost.lastModified = firebase.timestamp();
    firebase.runTransaction(transaction => {
      return transaction
        .get(firebase.postIndex())
        .then(postIndex => {
          let index = postIndex.data().index || [];
          index.push({
            title: payload.cmsPost.post.title,
            date: payload.cmsPost.post.date,
            postDataId: payload.id
          });
          transaction.update(firebase.postIndex(), { index: index });
        })
        .then(() => {
          transaction.update(
            firebase.cmsPosts().doc(payload.id),
            payload.cmsPost
          );
        })
        .then(() => {
          transaction.update(
            firebase.posts().doc(payload.id),
            payload.cmsPost.post
          );
        })
        .then(() => {
          transaction.update(
            firebase.postData().doc(payload.id),
            payload.cmsPost.postData
          );
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

function unpublish(payload, firebase) {
  return new Promise((resolve, reject) => {
    payload.cmsPost.lastModified = firebase.timestamp();
    firebase.runTransaction(transaction => {
      return transaction
        .get(firebase.postIndex())
        .then(postIndex => {
          let index = postIndex.data().index;
          let indToRemove = index.findIndex(
            post => post.postDataId === payload.id
          );
          index.splice(indToRemove, 1);
          transaction.update(firebase.postIndex(), { index: index });
        })
        .then(() => {
          transaction.update(
            firebase.cmsPosts().doc(payload.id),
            payload.cmsPost
          );
        })
        .then(() => {
          transaction.update(
            firebase.posts().doc(payload.id),
            payload.cmsPost.post
          );
        })
        .then(() => {
          transaction.update(
            firebase.postData().doc(payload.id),
            payload.cmsPost.postData
          );
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

function updatePost(payload, firebase) {
  let doUpdateIndex = payload.cmsPost.post.isPublished;
  return new Promise((resolve, reject) => {
    payload.cmsPost.lastModified = firebase.timestamp();
    if (doUpdateIndex) {
      firebase.runTransaction(transaction => {
        return transaction
          .get(firebase.postIndex())
          .then(postIndex => {
            let index = postIndex.data().index;
            let postIndexEle = index.find(
              post => post.postDataId === payload.id
            );
            postIndexEle.title = payload.cmsPost.post.title;
            postIndexEle.date = payload.cmsPost.post.date;
            transaction.update(firebase.postIndex(), { index: index });
          })
          .then(() => {
            transaction.update(
              firebase.cmsPosts().doc(payload.id),
              payload.cmsPost
            );
          })
          .then(() => {
            transaction.update(
              firebase.posts().doc(payload.id),
              payload.cmsPost.post
            );
          })
          .then(() => {
            transaction.update(
              firebase.postData().doc(payload.id),
              payload.cmsPost.postData
            );
          })
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    } else {
      let batch = firebase.batch();
      batch.update(firebase.cmsPosts().doc(payload.id), payload.cmsPost);
      batch.update(firebase.posts().doc(payload.id), payload.cmsPost.post);
      batch.update(
        firebase.postData().doc(payload.id),
        payload.cmsPost.postData
      );
      batch
        .commit()
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    }
  });
}

function createPost(payload, firebase) {
  return new Promise((resolve, reject) => {
    let newId;
    firebase
      .cmsPosts()
      .add(payload.cmsPost)
      .then(docRef => {
        newId = docRef.id;
        let batchCreate = firebase.batch();
        batchCreate.set(firebase.posts().doc(newId), payload.cmsPost.post);
        batchCreate.set(
          firebase.postData().doc(newId),
          payload.cmsPost.postData
        );
        batchCreate.commit();
      })
      .then(() => {
        resolve(newId);
      })
      .catch(error => {
        reject(error);
      });
  });
}
