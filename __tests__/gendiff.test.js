import fs from 'fs';
import genDiff from '../index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['json', 'stylish', 'stylishExpected.txt'],
  ['yml',  'stylish', 'stylishExpected.txt'],
  ['ini',  'stylish', 'stylishExpected.txt'],
  ['json', 'plain', 'plainExpected.txt'],
  ['yml',  'plain', 'plainExpected.txt'],
  ['ini',  'plain', 'plainExpected.txt'],
])('gendiff %s output match', (extension, format, expectedOupput) => {
  expect(genDiff(getFixturePath(`before.${extension}`), getFixturePath(`after.${extension}`), format)).toEqual(readFile(expectedOupput));
});


