import React from "react";
import {Link} from "react-router-dom";

export default function NotFound() {
  return(
    <div>
      <h1>Page not found</h1>
      <h2>Return to <Link to="/">home page</Link></h2>
    </div>
  )
}
