import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPathnameFromIndex } from "../util/url-util";
import { withFirebase } from "./firebase";

import ResponsiveDrawer from "./responsive-drawer";
import NavLinkGroup from "./nav-link-group";
import TreeManager from "./tree-manager";
import BlogContent from "./blog-content";

import useUrlState from "./../hooks/useUrlState";
import usePostData from "./../hooks/usePostData";
import usePostRedirect from "./../hooks/usePostRedirect";

/**
 * Top level component for tree / content synchronization
 * Adjusts url based on tree node chosen, and fetches the corresponding data
 */
export default withFirebase(PhotographyLayout);

function PhotographyLayout(props) {
  usePostRedirect(props.postIndex);

  const { postData, postDataPending } = usePostData(
    props.firebase,
    props.postIndex
  );
  const Content = <BlogContent postData={postData} loading={postDataPending} />;

  const { postKey, postTitle } = useUrlState();
  useEffect(() => {
    if (postTitle) {
      document.title = postTitle;
    }
  }, [postTitle]);

  return (
    <ResponsiveDrawer content={Content}>
      <div className="mb-4 p-2">
        <NavLinkGroup pageName={props.pageName} />
      </div>
      <TreeManager postIndex={props.postIndex} />
    </ResponsiveDrawer>
  );
}
