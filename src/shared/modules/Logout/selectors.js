import { bindActionCreators } from 'redux';

import {
  logout,
} from './actions';

export function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
  };
}
