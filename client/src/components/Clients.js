import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Clients.scss';

export default () => (
  <div className="Client">
    <div>
      Truca al
      <div className="number">{process.env.REACT_APP_PHONE}</div>
    </div>
    <Link to="/about">
      <h4>Com funciona?</h4>
    </Link>
  </div>
);
