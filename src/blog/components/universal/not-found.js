import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

export default function NotFound({ body }) {
  const history = useHistory();

  return (
    <Container>
      <h3 className="text-muted">
        {body ? (
          body
        ) : (
          <>
            There's nothing here! Try going
            <a
              onClick={() => {
                history.goBack();
              }}
              href="/blog/map"
            >
              {" "}
              back
            </a>
            , or start from the
            <Link to="/blog/map"> map</Link>.
          </>
        )}
      </h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  text-align: center;
  height: 80vh;
  justify-content: center;
  flex-direction: column;
`;
