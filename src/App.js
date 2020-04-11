import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Home from "./pages/home";
import Blog from "./pages/blog";
import NotFound from "./blog/components/universal/not-found";

/**
 * Main App Router, with CSS Baseline
 */
export default function BaseApp() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/blog/:view">
            <Blog />
          </Route>
          <Route path="/blog">
            <Redirect to="/blog/map" />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
