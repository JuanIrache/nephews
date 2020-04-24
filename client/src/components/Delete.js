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
          <h3>If you created an account, you can cancel it here</h3>
          <label htmlFor="phone" className="small">
            Phone number
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
            <p className="danger">
              Error. Could you double check the phone number?
            </p>
          )}
        </form>
      ) : (
        <p className="success">
          Thank you. You will soon receive instructions by SMS.
        </p>
      )}

      <div className="links">
        <h4>
          <Link to="/about">How does this work??</Link>
        </h4>
        <h4>
          <Link to="/providers">Sign up</Link>
        </h4>
      </div>
    </div>
  );
};
