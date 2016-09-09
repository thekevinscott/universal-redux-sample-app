import React from 'react';
import { Field, reduxForm } from 'redux-form';
import getName from './getName';
import renderField from './renderField';
import renderError from './renderError';

function Form({
  handleSubmit,
  fields,
  submitting,
  error,
}: {
  handleSubmit: Function,
  fields: Object,
  submitting: boolean,
  error: any,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      disabled={submitting}
    >
      {fields.map(({
        name,
        type,
        label,
        value,
      }) => {
        const formattedName = getName(name, label);
        return (
          <div key={name} className="field">
            <label
              htmlFor={formattedName}
            >
              {label || type || formattedName.toUpperCase()}
            </label>
            <Field
              name={formattedName}
              component={renderField}
              type={type || 'text'}
              value={value}
            />
          </div>
        );
      })}
      {renderError(error, true)}
      <button type="submit">Submit</button>
    </form>
  );
}

export default reduxForm({
  form: 'formName',
})(Form);
