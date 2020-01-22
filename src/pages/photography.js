import React from "react";

import { withFirebase } from "../components/firebase";

import PageManager from "../components/page-manager";
import Fade from "@material-ui/core/Fade";
import LoadingOverlay from "../components/loading-overlay";

import useUrlState from "./../hooks/useUrlState";
import usePostIndex from "./../hooks/usePostIndex";
import useIndexRedirect from "./../hooks/useIndexRedirect";

/**
 * Page level component for photography section
 * - one time fetch of post index data
 * - determine initial post to show + URL
 */
export default withFirebase(Photography);

function Photography(props) {
  // If collection isn't valid, replace url path with default collection to render
  useIndexRedirect();

  const { collection } = useUrlState();
  const { postIndexPending, postIndex } = usePostIndex(
    collection,
    props.firebase
  );

  return (
    <>
      <LoadingOverlay type="linear" visible={postIndexPending} />
      <Fade in={!postIndexPending}>
        <div className="container-fluid p-0">
          <PageManager postIndex={postIndex} pageName={collection} />
        </div>
      </Fade>
    </>
  );
}
