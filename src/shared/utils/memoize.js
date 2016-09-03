const getObj = (el, specifiedKey) => Object.keys(el).filter(key => {
  return key !== specifiedKey;
}).reduce((elObj, key) => ({
  ...elObj,
  [key]: el[key],
}), {});

const processArr = (arr, key = 'id', fn = () => {}) => {
  return arr.reduce((obj, el) => {
    if (typeof el === 'string') {
      return {
        ...obj,
        [el]: {
          ...fn(el),
        },
      };
    }

    return {
      ...obj,
      [el[key]]: {
        ...getObj(el, key),
        ...fn(el),
      },
    };
  }, {});
};

const memoize = (arr, ...rest) => {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided', arr);
  }

  if (typeof rest[0] === 'function') {
    return processArr(arr, null, ...rest);
  }

  return processArr(arr, ...rest);
};

export default memoize;
