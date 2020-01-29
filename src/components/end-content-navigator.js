import React, { useState, useEffect } from "react";
import useUrlState from "./../hooks/useUrlState";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { createTreeData } from "./rc-tree/util";
import { getKeyFromIndex, getPathnameFromIndex } from "./../util/url-util";

const Container = styled.div`
  margin: 25px auto 0 auto;
  width: 60%;
`;

const ButtonLink = styled.button`
  background: none;
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: rgb(255, 69, 0);
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover:after {
    width: 100%;
    left: 0;
  }
`;

export default function EndContentNavigator(props) {
  const { postKey, collection } = useUrlState();
  const history = useHistory();

  // elements from props.index (to get title and postdataid)
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const sequentialTreeData = createTreeData(props.index).sequentialData;

  useEffect(() => {
    // when post key or collection changes, find new prev/next post
    if (postKey == null) {
      return;
    }
    const currentTreeId = props.index.find(
      post => getKeyFromIndex(post).toUpperCase() === postKey.toUpperCase()
    ).postDataId;

    // treeData key is the post data id.
    const currPostIndex = sequentialTreeData.findIndex(
      post => currentTreeId === post.key
    );

    let prevPostIndex =
      currPostIndex !== 0 ? currPostIndex - 1 : sequentialTreeData.length - 1;
    setPrevPost(sequentialTreeData[prevPostIndex]);

    let nextPostIndex =
      currPostIndex !== sequentialTreeData.length - 1 ? currPostIndex + 1 : 0;
    setNextPost(sequentialTreeData[nextPostIndex]);
  }, [postKey, props.index]);

  function onButtonClick(e) {
    const newPostTreedata =
      e.currentTarget.dataset.direction === "previous" ? prevPost : nextPost;
    const newPost = props.index.find(
      post => post.postDataId === newPostTreedata.key
    );
    const newUrl = getPathnameFromIndex(newPost, collection);
    history.push(newUrl);
  }

  return (
    <Container>
      <div className="row text-center">
        <div className="col">
          <ButtonLink
            type="button"
            data-direction="previous"
            onClick={onButtonClick}
          >
            <h6 className="text-muted">Previous</h6>
            <h3>{prevPost && prevPost.title}</h3>
          </ButtonLink>
        </div>
        <div className="col">
          <ButtonLink
            type="button"
            data-diretion="next"
            onClick={onButtonClick}
          >
            <h6 className="text-muted">Next</h6>
            <h3>{nextPost && nextPost.title}</h3>
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
