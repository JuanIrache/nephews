import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Checkbox from './Checkbox';
import languages from '../data/languages';
import skills from '../data/skills';
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
            Sign up with your phone number and help people in need of basic tech
            support
          </h3>
          <label htmlFor="name" className="small">
            Name
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
            Last name
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
            Mobile phone
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
            <label className="small">Languages</label>
            {languages.map(l => (
              <Checkbox
                key={l.code}
                {...l}
                group="languages"
                onChange={onChangeCheck}
              />
            ))}
          </div>

          <div className="checkgroup">
            <label className="small">Skills</label>
            {skills.map(s => (
              <Checkbox
                key={s.code}
                {...s}
                group="skills"
                onChange={onChangeCheck}
              />
            ))}
          </div>

          <div className="checkbox conditions">
            <input type="checkbox" name="conditions" id="conditions" required />
            <label htmlFor="conditions">
              Do you accept the{' '}
              <Link to="/terms" target="_blank">
                terms and conditions
              </Link>
              ?
            </label>
          </div>
          <input type="submit" value="Sign up" />
          {result === 'fail' && (
            <p className="danger">Error communicating with server</p>
          )}
        </form>
      ) : (
        <p className="success">
          Thank you. You will soon receive instructions by SMS.
        </p>
      )}

      <div className="links">
        <h4>
          <Link to="/about">How does this work?</Link>
        </h4>
        <h4>
          <Link to="/delete">Cancel my account</Link>
        </h4>
      </div>
    </div>
  );
};
