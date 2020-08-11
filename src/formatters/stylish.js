import _ from 'lodash';

const indent = { style: ' ', baseCount: 2, depthMultiplicator: 4 };
const getIndent = (depth) => {
  const indentCount = indent.baseCount + depth * indent.depthMultiplicator;
  return indent.style.repeat(indentCount);
};

const formatValue = (data, depth) => {
  const currIndent = getIndent(depth);
  if (!_.isObject(data)) {
    return data;
  }
  const formatedValue = Object.entries(data).map(([key, value]) => `${currIndent}      ${key}: ${formatValue(value, depth + 1)}`);
  return `{\n${formatedValue.join('\n')}\n${currIndent}  }`;
};

const makeStylish = (diffTree) => {
  const buildOutput = (data, depth = 0) => {
    const currIndent = getIndent(depth);
    return data.map(({
      key, status, oldValue, newValue, value, children,
    }) => {
      switch (status) {
        case 'removed':
          return `${currIndent}- ${key}: ${formatValue(oldValue, depth)}`;
        case 'added':
          return `${currIndent}+ ${key}: ${formatValue(newValue, depth)}`;
        case 'unchanged':
          return `${currIndent}  ${key}: ${formatValue(value, depth)}`;
        case 'changed':
          return `${currIndent}+ ${key}: ${formatValue(oldValue, depth)}\n${currIndent}- ${key}: ${formatValue(newValue, depth)}`;
        case 'nested':
          return `${currIndent}  ${key}: {\n${buildOutput(children, depth + 1)}\n${currIndent}  }`;
        default:
          throw new Error(`${status} is unknown status!`);
      }
    }).join('\n');
  };
  return `{\n${buildOutput(diffTree)}\n}`;
};

export default makeStylish;
