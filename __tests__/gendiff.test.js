import fs from 'fs';
import genDiff from '../index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedOupput = readFile('result.txt');

test.each([
  ['json'],
  ['yml'],
  ['ini'],
])('gendiff %s output match', (extension) => {
  expect(genDiff(getFixturePath(`before.${extension}`), getFixturePath(`after.${extension}`), 'stylish')).toEqual(expectedOupput);
});


