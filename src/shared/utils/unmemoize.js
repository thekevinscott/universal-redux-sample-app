const unmemoize = obj => {
  if (Array.isArray(obj) || typeof obj !== 'object') {
    throw new Error('Invalid object provided', obj);
  }

  return Object.keys(obj).map(id => ({
    ...obj[id],
    id,
  }));
};

export default unmemoize;
