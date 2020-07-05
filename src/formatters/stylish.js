const valueConvert = (data, intend) => ((typeof data !== 'object') ? data
  : Object.entries(data).map(([key, value]) => `{\n${intend}    ${key}: ${value}\n${intend}  }`));

const stylish = (diffTree) => {
  const intend = { style: ' ', baseCount: 2, depthMultiplicator: 4 };
  const buildOutput = (data, depth = 0) => {
    const currIntend = intend.style.repeat(intend.baseCount + depth * intend.depthMultiplicator);
    return data.reduce((acc, {
      name, status, prevValue, currValue, children,
    }) => {
      switch (status) {
        case 'removed':
          return [...acc, `${currIntend}- ${name}: ${valueConvert(prevValue, currIntend)}`];
        case 'added':
          return [...acc, `${currIntend}+ ${name}: ${valueConvert(currValue, currIntend)}`];
        case 'unchanged':
          return [...acc, `${currIntend}  ${name}: ${valueConvert(currValue, currIntend)}`];
        case 'changed':
          return [...acc, `${currIntend}+ ${name}: ${valueConvert(prevValue, currIntend)}\n${currIntend}- ${name}: ${valueConvert(currValue, currIntend)}`];
        case 'valuesIsObject':
          return [...acc, `${currIntend}  ${name}: {\n${buildOutput(children, depth + 1)}\n${currIntend}  }`];
        default:
          throw new Error(`${status} is unknown stasus!`);
      }
    }, []).join('\n');
  };
  return `{\n${buildOutput(diffTree)}\n}`;
};

export default stylish;
