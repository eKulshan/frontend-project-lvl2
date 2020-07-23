import _ from 'lodash';

const formatValue = (data, indent) => {
  if (!_.isObject(data)) {
    return data;
  }
  const formatedValue = Object.entries(data).reduce((acc, [key, value]) => [...acc, `${indent}    ${key}: ${formatValue(value, `${indent}  `)}`], []);
  return `{\n${formatedValue.join('\n')}\n${indent}  }`;
};

const indent = { style: ' ', baseCount: 2, depthMultiplicator: 4 };
const getIndent = (depth) => {
  const indentCount = indent.baseCount + depth * indent.depthMultiplicator;
  return indent.style.repeat(indentCount);
};

const makeStylish = (diffTree) => {
  const buildOutput = (data, depth = 0) => {
    const currIndent = getIndent(depth);
    return data.reduce((acc, {
      key, status, oldValue, newValue, value, children,
    }) => {
      switch (status) {
        case 'removed':
          return [...acc, `${currIndent}- ${key}: ${formatValue(oldValue, currIndent)}`];
        case 'added':
          return [...acc, `${currIndent}+ ${key}: ${formatValue(newValue, currIndent)}`];
        case 'unchanged':
          return [...acc, `${currIndent}  ${key}: ${formatValue(value, currIndent)}`];
        case 'changed':
          return [
            ...acc,
            `${currIndent}+ ${key}: ${formatValue(oldValue, currIndent)}`,
            `${currIndent}- ${key}: ${formatValue(newValue, currIndent)}`,
          ];
        case 'nested':
          return [...acc, `${currIndent}  ${key}: {\n${buildOutput(children, depth + 1)}\n${currIndent}  }`];
        default:
          throw new Error(`${status} is unknown status!`);
      }
    }, []).join('\n');
  };
  return `{\n${buildOutput(diffTree)}\n}`;
};

export default makeStylish;
