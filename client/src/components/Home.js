import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Home.scss';

export default () => {
  return (
    <div className="Home">
      <Link to="/clients">
        <p>Necessito ajuda</p>
      </Link>
      <Link to="/providers">
        <p>Vull ajudar</p>
      </Link>
    </div>
  );
};
