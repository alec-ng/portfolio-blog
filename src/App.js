import React from "react";
import { withAuthentication } from "./components/session";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Game from "./pages/react-tut";
import Home from "./pages/home";
import Blog from "./pages/blog";
import Portfolio from "./pages/portfolio";
import Photography from "./pages/photography";
import Admin from "./pages/admin";
import Login from "./pages/login";
import NotFound from "./pages/not-found";

const BaseApp = function(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/tutorial">
          <Game />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/portfolio">
          <Portfolio />
        </Route>
        <Route path="/photography">
          <Photography />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

const App = withAuthentication(BaseApp);
export default App;
