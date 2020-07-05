const valueConvert = (data) => {
  if (typeof data === 'object') {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const plain = (diffTree) => {
  const buildOutput = (data, path) => data.reduce((acc, {
    name, status, prevValue, currValue, children,
  }) => {
    const fullName = `${path}${name}`;
    switch (status) {
      case 'removed':
        return [...acc, `Property '${fullName}' was removed`];
      case 'added':
        return [...acc, `Property '${fullName}' was added with value: ${valueConvert(currValue)}`];
      case 'unchanged':
        return acc;
      case 'changed':
        return [...acc, `Property '${fullName}' was updated. From ${valueConvert(prevValue)} to ${valueConvert(currValue)}`];
      case 'valuesIsObject':
        return [...acc, buildOutput(children, `${fullName}.`)];
      default:
        throw new Error(`${status} is unknown stasus!`);
    }
  }, []).join('\n');
  return `${buildOutput(diffTree, '')}`;
};

export default plain;
