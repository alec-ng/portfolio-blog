import React from "react";
import { withAuthorization } from '../components/session';

const Blog = () => (
  <div>
    <h1>Blog Page</h1>
  </div>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Blog);