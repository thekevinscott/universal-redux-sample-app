import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'shared/components/Form';

import {
  mapDispatchToProps,
} from './selectors';

function Login({
  login,
}: {
  login: Function,
}) {
  return (
    <div>
      <h1>Login</h1>
      <Form
        onSubmit={data => {
          return login(data);
        }}
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
      />
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
