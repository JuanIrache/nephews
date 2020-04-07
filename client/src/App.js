import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Clients from './components/Clients';
import Providers from './components/Providers';
import About from './components/About';

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
        <Route exact path="/clients">
          <Clients />
        </Route>
        <Route exact path="/providers">
          <Providers />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </div>
);
