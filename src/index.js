import fs from 'fs';
import path from 'path';
import getDifference from './getDifference.js';
import parseData from './parsers.js';
import formatters from './formatters/index.js';

const readFile = (filepath) => {
  const fullPathToFile = (filepath.startsWith('/')) ? filepath : path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPathToFile, 'utf-8');
  return data;
};

const genDiff = (file1Path, file2Path, format) => {
  const file1 = {
    path: file1Path,
  };
  file1.formatName = path.extname(file1.path).slice(1);
  file1.data = readFile(file1.path);
  file1.parsedData = parseData(file1.data, file1.formatName);

  const file2 = {
    path: file1Path,
  };
  file2.formatName = path.extname(file2.path).slice(1);
  file2.data = readFile(file2.path);
  file2.parsedData = parseData(file2.data, file2.formatName);

  return formatters[format](getDifference(file1.parsedData, file2.parsedData));
};

export default genDiff;
