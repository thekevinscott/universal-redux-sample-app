import { bindActionCreators } from 'redux';
import fetch from 'shared/utils/fetch';

export function fetchHome() {
  return dispatch => {
    return dispatch({
      type: 'FETCH_HOME',
      fetch: fetch('/home', {
        method: 'get',
      }),
    }).then(response => {
      console.log('response for home', response);
    }).catch(err => {
      console.log('err', err);
    });
  };
}

export function mapStateToProps() {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchHome: bindActionCreators(fetchHome, dispatch),
  };
}

