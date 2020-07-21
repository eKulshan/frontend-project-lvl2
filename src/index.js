import fs from 'fs';
import path from 'path';
import getDifference from './getDifference.js';
import parseData from './parsers.js';
import formatData from './formatters/index.js';

const getFullPathToFile = (filepath) => path.resolve(process.cwd(), filepath);
const getFormatName = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => {
  const fullPathToFile = getFullPathToFile(filepath);
  return fs.readFileSync(fullPathToFile, 'utf-8');
};

const genDiff = (file1Path, file2Path, format) => {
  const file1Data = readFile(file1Path);
  const file2Data = readFile(file2Path);
  const file1FormatName = getFormatName(file1Path);
  const file2FormatName = getFormatName(file2Path);

  const file1ParsedData = parseData(file1Data, file1FormatName);
  const file2ParsedData = parseData(file2Data, file2FormatName);
  return formatData(getDifference(file1ParsedData, file2ParsedData), format);
};

export default genDiff;
