import typeToReducer from 'type-to-reducer';
//import {
  //types,
//} from 'shared/redux/middlewares/authentication';

const initialState = {
  token: null,
};

export default typeToReducer({
  //[types.SAVE_TOKEN]: (state, {
    //token,
  //}) => ({
    //...state,
    //token,
  //}),
  //[types.UNAUTHENTICATE]: (state) => ({
    //...state,
    //token: null,
  //}),
}, initialState);
