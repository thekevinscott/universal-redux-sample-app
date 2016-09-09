import React, { Component } from 'react';
import { Link } from 'react-router';

class Page extends Component {
  render() {
    return (
      <div>
        This is a regular sub Page.
        <Link to="/">Go Home</Link>
      </div>
    );
  }
}

export default Page;
