import { bindActionCreators } from 'redux';

import {
  login,
  validate,
} from './actions';

export function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
    validate,
  };
}
