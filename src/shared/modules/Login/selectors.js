import { bindActionCreators } from 'redux';

import {
  login,
} from './actions';

export function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
  };
}
