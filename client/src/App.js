import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home';

import './style/App.scss';

export default () => (
  <div className="App">
    <Router>
      <header>
        <Link to="/">
          <h1>nebots</h1>
          <h2>assistència tècnica general</h2>
        </Link>
      </header>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </div>
);
