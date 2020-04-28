import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Clients.scss';

const { REACT_APP_PHONE } = process.env;

export default () => (
  <div className="Client">
    <div className="client-content">
      Call
      <a href={`tel:${process.env.REACT_APP_PHONE}`} className="number">
        {REACT_APP_PHONE}
      </a>
    </div>
    <Link to="/about">
      <h4>How does this work?</h4>
    </Link>
  </div>
);
