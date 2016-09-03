import React, { Component } from 'react';

import {
  CLIENT,
} from 'config';

export default class App extends Component {
  contextTypes : {
    store: any,
  }

  props: {
    store: Object,
    children: any,
  }

  render() {
    if (CLIENT) {
      require('shared/stylesheets/main.scss');
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
