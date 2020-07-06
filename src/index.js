import getDifference from './getDifference.js';
import parseData from './parsers.js';
import readFile from './readFile.js';
import formatters from './formatters/index.js';

const genDiff = (firstFilePath, secondFilePath, format) => {
  const beforeData = parseData(readFile(String(firstFilePath)));
  const afterData = parseData(readFile(String(secondFilePath)));
  return formatters[format](getDifference(beforeData, afterData));
};

export default genDiff;
