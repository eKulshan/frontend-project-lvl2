import fs from 'fs';
import genDiff from '../src/gendiff.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedOupput = readFile('result.txt');

test('gendiff output match', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json'))).toEqual(expectedOupput);
});
