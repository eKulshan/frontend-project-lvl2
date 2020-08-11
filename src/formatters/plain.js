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
  const buildOutput = (data, paths) => data.flatMap(({
    key, status, oldValue, newValue, children,
  }) => {
    const currPath = [...paths, key];
    const fullName = currPath.join('.');
    switch (status) {
      case 'removed':
        return `Property '${fullName}' was removed`;
      case 'added':
        return `Property '${fullName}' was added with value: ${formatValue(newValue)}`;
      case 'unchanged':
        return [];
      case 'changed':
        return `Property '${fullName}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      case 'nested':
        return buildOutput(children, currPath);
      default:
        throw new Error(`${status} is unknown status!`);
    }
  }).join('\n');
  return buildOutput(diffTree, []);
};

export default makePlain;
