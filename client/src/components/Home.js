import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Home.scss';

export default () => (
  <div className="Home">
    <Link to="/clients">
      <p>I need help with technology</p>
    </Link>
    <Link to="/providers">
      <p>I want to help</p>
    </Link>
  </div>
);
