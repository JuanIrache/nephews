import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../style/Providers.scss';

export default () => {
  const [form, setForm] = useState({ name: '', lastName: '', phone: '' });
  const [result, setResult] = useState('');
  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    fetch(process.env.REACT_APP_SERVER + '/provider', {
      method: 'POST',
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
          <h3>
            Registra el teu telèfon per ajudar a qui necessiti suport tècnic
          </h3>
          <label htmlFor="name" className="small">
            Nom
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={onChange}
            required
          />

          <label htmlFor="lastName" className="small">
            Cognoms
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={form.lastName}
            onChange={onChange}
            required
          />

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

          <label>
            <input type="checkbox" name="conditions" required /> Acceptes les{' '}
            <Link to="/terms" target="_blank">
              condicions d'ús
            </Link>
            ?
          </label>
          <input type="submit" value="Registrar" />
          {result === 'fail' && (
            <p className="danger">Error comunicant amb el servidor</p>
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
          <Link to="/delete">Donar-se de baixa</Link>
        </h4>
      </div>
    </div>
  );
};
