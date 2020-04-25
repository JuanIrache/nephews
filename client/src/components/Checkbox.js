import React from 'react';

import '../style/Checkbox.scss';

export default ({ name, code, group, onChange }) => (
  <div className="Checkbox">
    <input
      type="checkbox"
      name={code}
      id={`checkbox-${code}`}
      data-group={group}
      onChange={onChange}
    />
    <label htmlFor={`checkbox-${code}`}>{name}</label>
  </div>
);
