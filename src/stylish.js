const valueConvert = (data, intend) => {
  if (typeof data !== 'object') {
    return data;
  }
  return Object.entries(data).map(([key, value]) => `{\n${intend}    ${key}: ${value}\n${intend}  }`);
};

const stylish = (diffTree) => {
  const intend = { style: ' ', baseCount: 2, depthMultiplicator: 4 };
  const buildString = (data, depth = 0) => {
    const currIntend = intend.style.repeat(intend.baseCount + depth * intend.depthMultiplicator);
    return data.map(({
      name, status, prevValue, currValue, children,
    }) => {
      switch (status) {
        case 'removed':
          return `${currIntend}- ${name}: ${valueConvert(prevValue, currIntend)}`;
        case 'added':
          return `${currIntend}+ ${name}: ${valueConvert(currValue, currIntend)}`;
        case 'unchanged':
          return `${currIntend}  ${name}: ${valueConvert(currValue, currIntend)}`;
        case 'changed':
          return `${currIntend}+ ${name}: ${valueConvert(prevValue, currIntend)}\n${currIntend}- ${name}: ${valueConvert(currValue, currIntend)}`;
        case 'valueCompare':
          return `${currIntend}  ${name}: {\n${buildString(children, depth + 1)}\n${currIntend}  }`;
        default:
          throw new Error(`${status} is unknown stasus!`);
      }
    }).join('\n');
  };
  return `{\n${buildString(diffTree)}\n}`;
};

export default stylish;
