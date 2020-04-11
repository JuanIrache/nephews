import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Clients.scss';

export default () => (
  <div className="Client">
    <div className="client-content">
      Truca al
      <a href={`tel:+34${process.env.REACT_APP_PHONE}`} className="number">
        {process.env.REACT_APP_PHONE}
      </a>
    </div>
    <Link to="/about">
      <h4>Com funciona?</h4>
    </Link>
  </div>
);
