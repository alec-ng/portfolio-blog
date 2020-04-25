import React from "react";
import styled from "styled-components";

/**
 * Renders buttons to navigate to the next/previous posts (relative to the current post)
 */
export default function EndContentNavigator({
  onButtonClick,
  prevPost,
  nextPost
}) {
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
            <h4>{prevPost.title}</h4>
          </ButtonLink>
        </div>
        <div className="col">
          <ButtonLink
            type="button"
            data-diretion="next"
            onClick={onButtonClick}
          >
            <h6 className="text-muted">Next</h6>
            <h4>{nextPost.title}</h4>
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}

// ------- STYLES

const Container = styled.div`
  margin: 25px auto 0 auto;
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
