import React from 'react';
import renderError from './renderError';

const renderField = ({
  input,
  label,
  type,
  meta: {
    touched,
    error,
  },
}: {
  input: any,
  label: any,
  type: any,
  meta: any,
}) => {
  return (
    <div className="input">
      <input
        {...input}
        placeholder={label}
        type={type}
      />
      {renderError(error, touched)}
    </div>
  );
};

export default renderField;
