import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Home.scss';

export default () => (
  <div className="Home">
    <Link to="/clients">
      <p>Necessito ajuda amb la tecnologia</p>
    </Link>
    <Link to="/providers">
      <p>Vull ajudar</p>
    </Link>
  </div>
);
