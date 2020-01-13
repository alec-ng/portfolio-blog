// Delete cmsPost, post, postData documents
export function deletePost(payload, firebase) {
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

// Append post to postIndex, and update cms-post, post, postData documents
export function publish(payload, firebase) {
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

// Remove post from postIndex, and update cms-post, post, postData documents
export function unpublish(payload, firebase) {
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

// if post is published, update corresponding entry in postIndex
// update cms-post, post, postData documents
export function updatePost(payload, firebase) {
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

// create new cms-post document and use its auto-gen id as Ids for newly created
// post and postData documents
export function createPost(payload, firebase) {
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
