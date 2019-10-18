import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Game from './pages/react-tut';
import Home from './pages/home';
import Blog from './pages/blog';
import Portfolio from './pages/portfolio';
import Photography from './pages/photography';
import NotFound from './pages/not-found';

export default function App() {
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
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}