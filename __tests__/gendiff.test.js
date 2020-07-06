import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import readFile from '../src/readFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

test.each([
  ['json', 'stylish', 'stylishExpected.txt'],
  ['yml',  'stylish', 'stylishExpected.txt'],
  ['ini',  'stylish', 'stylishExpected.txt'],
  ['json', 'plain', 'plainExpected.txt'],
  ['yml',  'plain', 'plainExpected.txt'],
  ['ini',  'plain', 'plainExpected.txt'],
  ['json', 'json', 'jsonExpected.json'],
  ['yml',  'json', 'jsonExpected.json'],
  ['ini',  'json', 'jsonExpected.json'],

])('gendiff %s output match', (extension, format, expectedOupput) => {
  expect(genDiff(getFixturePath(`before.${extension}`), getFixturePath(`after.${extension}`), format)).toEqual(readFile(getFixturePath(expectedOupput))[0]);
});


