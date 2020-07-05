import getDifference from './src/getDifference.js';
import parseFile from './src/parsers.js';
import formatters from './src/formatters/index.js';

const genDiff = (firstFilePath, secondFilePath, format) => {
  const beforeData = parseFile(String(firstFilePath));
  const afterData = parseFile(String(secondFilePath));
  return formatters[format](getDifference(beforeData, afterData));
};

export default genDiff;
