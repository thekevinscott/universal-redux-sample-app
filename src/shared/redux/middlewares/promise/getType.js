const getType = (type, status) => {
  if (status === 'pending') {
    return `${type}_PENDING`;
  } else if (status === 'fulfilled') {
    return `${type}_FULFILLED`;
  } else if (status === 'rejected') {
    return `${type}_REJECTED`;
  }

  throw new Error(`Unsupported status ${status} requested`);
};

export default getType;
