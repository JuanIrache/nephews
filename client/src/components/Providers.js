import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../style/Providers.scss';

export default () => {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    phone: '',
    languages: [],
    skills: []
  });

  const [result, setResult] = useState('');

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeCheck = e => {
    const group = e.target.getAttribute('data-group');
    let arr = form[group];

    if (e.target.checked) arr = [...arr, e.target.name];
    else arr = arr.filter(a => a !== e.target.name);

    setForm({ ...form, [group]: arr });
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

          <div className="checkgroup">
            <label className="small">Idiomes</label>
            <label className="check">
              <input
                type="checkbox"
                name="cat"
                data-group="languages"
                onChange={onChangeCheck}
              />{' '}
              Català
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="spa"
                data-group="languages"
                onChange={onChangeCheck}
              />{' '}
              Castellà
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="eng"
                data-group="languages"
                onChange={onChangeCheck}
              />{' '}
              Anglès
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="urd"
                data-group="languages"
                onChange={onChangeCheck}
              />{' '}
              Urdú
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="ara"
                data-group="languages"
                onChange={onChangeCheck}
              />{' '}
              Àrab
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="chi"
                data-group="languages"
                onChange={onChangeCheck}
              />{' '}
              Xinès
            </label>
          </div>

          <div className="checkgroup">
            <label className="small">Coneixements</label>
            <label className="check">
              <input
                type="checkbox"
                name="win"
                data-group="skills"
                onChange={onChangeCheck}
              />{' '}
              Windows
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="mac"
                data-group="skills"
                onChange={onChangeCheck}
              />{' '}
              macOS
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="and"
                data-group="skills"
                onChange={onChangeCheck}
              />{' '}
              Android
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="ios"
                data-group="skills"
                onChange={onChangeCheck}
              />{' '}
              iOS
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="tvs"
                data-group="skills"
                onChange={onChangeCheck}
              />{' '}
              Televisors
            </label>
            <label className="check">
              <input
                type="checkbox"
                name="pho"
                data-group="skills"
                onChange={onChangeCheck}
              />{' '}
              Fotografia
            </label>
          </div>

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
