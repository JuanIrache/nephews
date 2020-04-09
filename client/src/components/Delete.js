import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../style/Providers.scss';

export default () => {
  const [form, setForm] = useState({ phone: '' });
  const [result, setResult] = useState('');
  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + '/provider', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (+res.status === 200) setResult('success');
        else setResult('fail');
      })
      .catch(err => {
        console.error(err);
        setResult('fail');
      });
  };
  return (
    <div className="Providers">
      {result !== 'success' ? (
        <form onSubmit={onSubmit}>
          <h3>Si has registrat el teu contacte, aquí pots eliminar-lo</h3>
          <label htmlFor="phone" className="small">
            Telèfon mòbil
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={form.phone}
            onChange={onChange}
            required
          />
          <input type="submit" value="Eliminar" />
          {result === 'fail' && (
            <p className="warning">Error. Segur que el número és correcte?</p>
          )}
        </form>
      ) : (
        <p className="success">Gràcies, aviat rebràs instruccions per SMS.</p>
      )}

      <div className="links">
        <h4>
          <Link to="/about">Com funciona?</Link>
        </h4>
        <h4>
          <Link to="/providers">Registra't</Link>
        </h4>
      </div>
    </div>
  );
};
