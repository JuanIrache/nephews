import React from 'react';

import '../style/Checkbox.scss';

export default ({ name, code, group, onChange }) => (
  <div className="Checkbox">
    <input
      type="checkbox"
      name={code}
      id={code}
      data-group={group}
      onChange={onChange}
    />
    <label htmlFor="eng">{name}</label>
  </div>
);
