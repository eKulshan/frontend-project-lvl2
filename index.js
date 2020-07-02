import getDifference from './src/getDifference.js';
import parseFile from './src/parsers.js';
import stylish from './src/stylish.js';

const output = { stylish };

const genDiff = (firstFilePath, secondFilePath, format) => {
  const beforeData = parseFile(String(firstFilePath));
  const afterData = parseFile(String(secondFilePath));
  return output[format](getDifference(beforeData, afterData));
};

export default genDiff;
