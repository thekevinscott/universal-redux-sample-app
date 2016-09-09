import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  mapStateToProps,
  mapDispatchToProps,
} from './selectors';

class Home extends Component {
  componentWillMount() {
    this.props.fetchHome();
  }

  render() {
    return (
      <div>
        This is home.
        <Link to="/some-other-page">Go to a second page.</Link>
        <Link to="/logout">Or, logout.</Link>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
