const formatValue = (data) => {
  if (typeof data === 'object') {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const makePlain = (diffTree) => {
  const buildOutput = (data, paths) => data.reduce((acc, {
    key, status, oldValue, newValue, children,
  }) => {
    const currPath = [...paths, key];
    const fullName = currPath.join('.');
    switch (status) {
      case 'removed':
        return [...acc, `Property '${fullName}' was removed`];
      case 'added':
        return [...acc, `Property '${fullName}' was added with value: ${formatValue(newValue)}`];
      case 'unchanged':
        return acc;
      case 'changed':
        return [...acc, `Property '${fullName}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`];
      case 'nested':
        return [...acc, buildOutput(children, currPath)];
      default:
        throw new Error(`${status} is unknown status!`);
    }
  }, []).join('\n');
  return buildOutput(diffTree, []);
};

export default makePlain;
