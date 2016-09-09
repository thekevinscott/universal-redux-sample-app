import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'shared/components/Form';
import { Link } from 'react-router';

import {
  mapDispatchToProps,
} from './selectors';

function Login({
  login,
  validate,
}: {
  login: Function,
  validate: Function,
}) {
  return (
    <div>
      <h1>Login</h1>
      <p>Login with 'test@test.com' and 'password'</p>
      <Form
        onSubmit={data => login(data)}
        fields={[
          {
            type: 'text',
            label: 'Email',
            name: 'email',
          },
          {
            type: 'password',
            label: 'Password',
            name: 'password',
          },
        ]}
        validate={validate}
        initialValues={{
          email: 'test@test.com',
          password: 'password',
        }}
      />
      <Link to="/register">Or, register.</Link>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
