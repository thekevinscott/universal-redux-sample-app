import React from 'react';

const renderError = (error, touched) => {
  if (error && touched) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }

  return null;
};

export default renderError;
