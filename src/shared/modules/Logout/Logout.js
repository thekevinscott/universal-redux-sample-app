import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  mapDispatchToProps,
} from './selectors';

class Logout extends Component {
  componentWillMount() {
    this.props.logout();
  }

  props: {
    logout: Function,
  }

  render() {
    return (
      <div />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);
