import React, { useEffect } from "react";

import { withFirebase } from "../components/firebase";

import Fade from "@material-ui/core/Fade";
import LoadingOverlay from "../components/loading-overlay";
import ResponsiveDrawer from "../components/responsive-drawer";
import NavLinkGroup from "../components/nav-link-group";
import TreeManager from "../components/tree-manager";
import BlogContent from "../components/blog-content";

import useUrlState from "../hooks/useUrlState";
import usePostIndex from "../hooks/usePostIndex";
import useIndexRedirect from "../hooks/useIndexRedirect";
import usePostData from "../hooks/usePostData";
import usePostRedirect from "../hooks/usePostRedirect";

/**
 * Page level component for photography section
 * - one time fetch of post index data
 * - determine initial post to show + URL
 */
export default withFirebase(Photography);

function Photography(props) {
  const { collection, postKey, postTitle } = useUrlState();
  useEffect(() => {
    if (postTitle) {
      document.title = postTitle;
    }
  }, [postTitle]);

  useIndexRedirect();
  const { postIndexPending, postIndex } = usePostIndex(
    collection,
    props.firebase
  );

  usePostRedirect(postIndex);
  const { postData, postDataPending } = usePostData(
    props.firebase,
    postIndex,
    postKey
  );

  const Content = <BlogContent postData={postData} loading={postDataPending} />;

  return (
    <>
      <LoadingOverlay type="linear" visible={postIndexPending} />
      <Fade in={!postIndexPending}>
        <div className="container-fluid p-0">
          <ResponsiveDrawer content={Content}>
            <div className="mb-4 p-2">
              <NavLinkGroup pageName={collection} />
            </div>
            <TreeManager postIndex={postIndex} />
          </ResponsiveDrawer>
        </div>
      </Fade>
    </>
  );
}
