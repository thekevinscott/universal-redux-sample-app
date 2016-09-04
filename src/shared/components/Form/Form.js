import React from 'react';
import { Field, reduxForm } from 'redux-form';

const inputs = [];

const getName = (name, label) => {
  if (name) {
    return name;
  }

  if (label) {
    return label.split(' ').join('-').toLowerCase();
  }

  const newInput = `input-${inputs.length}`;
  inputs.push(newInput);
  return newInput;
};

function Form({
  handleSubmit,
  fields,
}: {
  handleSubmit: Function,
  fields: Array,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {fields.map(({
        name,
        type,
        label,
      }, key) => {
        const formattedName = getName(name, label);
        return (
          <div key={key} className="field">
            <label htmlFor={formattedName}>{label || type || formattedName.toUpperCase()}</label>
            <Field name={formattedName} component="input" type={type || 'text'} />
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
}

export default reduxForm({
  form: 'form',
})(Form);
