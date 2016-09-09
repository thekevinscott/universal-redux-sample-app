const inputs = [];

const getName = (name, label) => {
  if (name) {
    return name;
  }

  if (label) {
    return label.split(' ').join('-').toLowerCase();
  }

  const newInput = `input-${inputs.length}`;
  inputs.push(newInput);
  return newInput;
};

export default getName;
