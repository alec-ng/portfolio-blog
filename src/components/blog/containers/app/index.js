import React, { useState } from "react";
import { withFirebase } from "../../../../hoc/firebase";
import useUrlState from "../../../../hooks/useUrlState";
import usePostIndex from "./usePostIndex";
import useFilterRedirect from "./useFilterRedirect";
import useIndexRedirect from "./useIndexRedirect";
import usePostFilter from "./usePostFilter";

import Fade from "@material-ui/core/Fade";
import ContentManager from "../content-manager";
import SidebarManager from "../sidebar-manager";
import LoadingOverlay from "../../generic/loading-overlay";

import SwipeableDrawer from "../../universal/swipable-drawer";
import AppBar, { useAppbarSpacerStyles } from "../../universal/appbar";

import styled from "styled-components";

/**
 * Top level container component for blog
 * High level layout & retrieves a grouping's published posts
 */
function Blog({ firebase }) {
  // Initiate a redirect if the collection or filters are not valid
  const { collection, filters } = useUrlState();
  useIndexRedirect(collection);
  useFilterRedirect(filters, collection);

  // Fetch a list containing all published posts of the specified collection
  const { postIndexPending, postIndex } = usePostIndex(collection, firebase);

  // Get a filtered subset if URL specifies any filters to apply
  const filteredPosts = usePostFilter(postIndex, filters, collection);

  // controlled swipeable container
  const [open, setOpen] = useState(false);
  function openDrawer() {
    setOpen(true);
  }
  function closeDrawer() {
    setOpen(false);
  }

  const classes = useAppbarSpacerStyles();

  return (
    <>
      <LoadingOverlay type="linear" visible={postIndexPending} />

      <Fade in={!postIndexPending}>
        <div className="container-fluid p-0">
          <AppBar openDrawer={openDrawer} />

          <SwipeableDrawer
            open={open}
            onClose={closeDrawer}
            onOpen={openDrawer}
          >
            <SidebarManager
              posts={postIndex}
              pending={postIndexPending}
              filteredPosts={filteredPosts}
            />
          </SwipeableDrawer>

          <ContentContainer>
            <div className={classes.toolbar} />
            <ContentManager filteredPosts={filteredPosts} />
          </ContentContainer>
        </div>
      </Fade>
    </>
  );
}
export default withFirebase(Blog);

const ContentContainer = styled.main`
  flex-grow: 1;
  position: relative;
  height: 100%;
`;
