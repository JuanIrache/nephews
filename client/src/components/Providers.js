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
            <div className="checkbox">
              <input
                type="checkbox"
                name="cat"
                id="cat"
                data-group="languages"
                onChange={onChangeCheck}
              />
              <label htmlFor="cat">Català</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="spa"
                id="spa"
                data-group="languages"
                onChange={onChangeCheck}
              />
              <label htmlFor="spa">Castellà</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="eng"
                id="eng"
                data-group="languages"
                onChange={onChangeCheck}
              />
              <label htmlFor="eng">Anglès</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="urd"
                id="urd"
                data-group="languages"
                onChange={onChangeCheck}
              />
              <label htmlFor="urd">Urdú</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="ara"
                id="ara"
                data-group="languages"
                onChange={onChangeCheck}
              />
              <label htmlFor="ara">Àrab</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="chi"
                id="chi"
                data-group="languages"
                onChange={onChangeCheck}
              />
              <label htmlFor="chi">Xinès</label>
            </div>
          </div>

          <div className="checkgroup">
            <label className="small">Coneixements</label>
            <div className="checkbox">
              <input
                type="checkbox"
                name="win"
                id="win"
                data-group="skills"
                onChange={onChangeCheck}
              />
              <label htmlFor="win">Windows</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="mac"
                id="mac"
                data-group="skills"
                onChange={onChangeCheck}
              />
              <label htmlFor="mac">macOS</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="and"
                id="and"
                data-group="skills"
                onChange={onChangeCheck}
              />
              <label htmlFor="and">Android</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="ios"
                id="ios"
                data-group="skills"
                onChange={onChangeCheck}
              />
              <label htmlFor="ios">iOS</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="tvs"
                id="tvs"
                data-group="skills"
                onChange={onChangeCheck}
              />
              <label htmlFor="tvs">Televisors</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="pho"
                id="pho"
                data-group="skills"
                onChange={onChangeCheck}
              />
              <label htmlFor="pho">Fotografia</label>
            </div>
          </div>

          <div className="checkbox conditions">
            <input type="checkbox" name="conditions" id="conditions" required />
            <label htmlFor="conditions">
              Acceptes les{' '}
              <Link to="/terms" target="_blank">
                condicions d'ús
              </Link>
              ?
            </label>
          </div>
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
