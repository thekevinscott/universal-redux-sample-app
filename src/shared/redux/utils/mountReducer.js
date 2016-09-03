/*
 * This is a convenience function for allowing custom
 * reducers to be broken into their own files,
 * and still mount onto other reducers.
 *
 * Arguments:
 * reducer - the reducer to mount
 * mountPoint - the key to mount the reducer to
 */

const iterateOverObject = (obj, fn) => {
  return Object.keys(obj).reduce((newObj, key) => {
    const el = obj[key];
    if (typeof el === 'function') {
      return {
        ...newObj,
        [key]: fn(el),
      };
    }

    return {
      ...obj,
      [key]: iterateOverObject(el, fn),
    };
  }, {});
};

const mountReducer = (reducer, mountPoint) => {
  return iterateOverObject(reducer, fn => (state, action) => ({
    ...state,
    [mountPoint]: fn(state[mountPoint], action),
  }));
};

export default mountReducer;
