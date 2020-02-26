import React, { useEffect, useState } from "react";
import { withFirebase } from "../hoc/firebase";
import useUrlState, { getUrlState } from "../hooks/useUrlState";
import useFilterRedirect from "../hooks/useFilterRedirect";
import usePostIndex from "../hooks/usePostIndex";
import { useHistory, useLocation } from "react-router-dom";
import { filterPosts } from "../util/post-filter";
import { urlDecodeStr } from "../util/url-util";
import {
  VALID_COLLECTIONS,
  COLLECTION_TRIPREPORTS,
  PATH_BLOG
} from "./../util/constants";

import Fade from "@material-ui/core/Fade";
import ContentManager from "../components/blog/containers/content-manager";
import SidebarManager from "../components/blog/containers/sidebar-manager";
import LoadingOverlay from "../components/blog/generic/loading-overlay";
import ResponsiveDrawer from "../components/blog/generic/drawer";

/**
 * Top level container component for blog
 * Responsible for retrieving filtered subsets of a grouping's published posts
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

  return (
    <>
      <LoadingOverlay type="linear" visible={postIndexPending} />
      <Fade in={!postIndexPending}>
        <div className="container-fluid p-0">
          <ResponsiveDrawer content={<ContentManager posts={filteredPosts} />}>
            <SidebarManager
              posts={postIndex}
              pending={postIndexPending}
              filteredPosts={filteredPosts}
            />
          </ResponsiveDrawer>
        </div>
      </Fade>
    </>
  );
}
export default withFirebase(Blog);

/**
 * Return subset of posts depending on filters specified in URL as well as collection
 * being shown
 */
function usePostFilter(posts, chosenFilters, collection) {
  const [filteredPosts, setFilteredPosts] = useState(null);

  useEffect(() => {
    if (posts) {
      let filtersToApply = Object.assign({}, chosenFilters);
      for (let key in filtersToApply) {
        filtersToApply[key] = urlDecodeStr(filtersToApply[key]);
      }
      setFilteredPosts(filterPosts(posts, filtersToApply, collection));
    }
  }, [posts, chosenFilters, collection]);

  return filteredPosts;
}

/**
 * If the collection specified by the url is not valid, redirect to the default collection
 */
function useIndexRedirect(collection) {
  const history = useHistory();
  const location = useLocation();
  const urlCollection = collection || getUrlState(location).urlCollection;

  useEffect(() => {
    if (VALID_COLLECTIONS.indexOf(urlCollection) === -1) {
      history.replace(`${PATH_BLOG}/${COLLECTION_TRIPREPORTS}`);
    }
  }, [urlCollection, history]);
}
