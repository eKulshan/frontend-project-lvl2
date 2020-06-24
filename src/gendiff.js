import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (firstFilePath, secondFilePath) => {
  const firstFileData = parseFile(String(firstFilePath));
  const secondFileData = parseFile(String(secondFilePath));
  const filesDataKeys = _.union(Object.keys(firstFileData), Object.keys(secondFileData));
  const result = filesDataKeys.reduce((acc, key) => {
    if (_.has(firstFileData, key)
    && _.has(secondFileData, key)
    && firstFileData[key] === secondFileData[key]) {
      acc.push(`  ${key}: ${secondFileData[key]}`);
    }
    if (_.has(firstFileData, key)
    && _.has(secondFileData, key)
    && firstFileData[key] !== secondFileData[key]) {
      acc.push(`+ ${key}: ${secondFileData[key]}`);
      acc.push(`- ${key}: ${firstFileData[key]}`);
    }
    if (!_.has(firstFileData, key) && _.has(secondFileData, key)) {
      acc.push(`+ ${key}: ${secondFileData[key]}`);
    }
    if (_.has(firstFileData, key) && !_.has(secondFileData, key)) {
      acc.push(`- ${key}: ${firstFileData[key]}`);
    }
    return acc;
  }, []);
  return `{\n  ${result.join('\n  ')}\n}`;
};

export default genDiff;
