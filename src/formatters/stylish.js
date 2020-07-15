const valueConvert = (data, intend) => ((typeof data !== 'object') ? data
  : Object.entries(data).map(([key, value]) => `{\n${intend}    ${key}: ${value}\n${intend}  }`));

const stylish = (diffTree) => {
  const intend = { style: ' ', baseCount: 2, depthMultiplicator: 4 };
  const buildOutput = (data, depth = 0) => {
    const currIntend = intend.style.repeat(intend.baseCount + depth * intend.depthMultiplicator);
    return data.reduce((acc, {
      name, status, oldValue, newValue, children,
    }) => {
      switch (status) {
        case 'removed':
          return [...acc, `${currIntend}- ${name}: ${valueConvert(oldValue, currIntend)}`];
        case 'added':
          return [...acc, `${currIntend}+ ${name}: ${valueConvert(newValue, currIntend)}`];
        case 'unchanged':
          return [...acc, `${currIntend}  ${name}: ${valueConvert(oldValue, currIntend)}`];
        case 'changed':
          return [...acc, `${currIntend}+ ${name}: ${valueConvert(oldValue, currIntend)}\n${currIntend}- ${name}: ${valueConvert(newValue, currIntend)}`];
        case 'nested':
          return [...acc, `${currIntend}  ${name}: {\n${buildOutput(children, depth + 1)}\n${currIntend}  }`];
        default:
          throw new Error(`${status} is unknown status!`);
      }
    }, []).join('\n');
  };
  return `{\n${buildOutput(diffTree)}\n}`;
};

export default stylish;
