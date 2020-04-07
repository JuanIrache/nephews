import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Providers.scss';

export default () => (
  <div className="Providers">
    <form>
      <h3>Registra el teu telèfon per ajudar a qui necessiti suport tècnic</h3>
      <label htmlFor="name" className="small">
        Nom
      </label>
      <input type="text" name="name" id="name" required />

      <label htmlFor="lastName" className="small">
        Cognoms
      </label>
      <input type="text" name="lastName" id="lastName" required />

      <label htmlFor="phone" className="small">
        Telèfon
      </label>
      <input type="tel" name="phone" id="phone" required />

      <label>
        <input type="checkbox" name="conditions" required /> Acceptes les
        condicions d'ús?
      </label>
      <input type="submit" value="Registrar" />
    </form>
    <Link to="/About">
      <h4>Com funciona?</h4>
    </Link>
  </div>
);
