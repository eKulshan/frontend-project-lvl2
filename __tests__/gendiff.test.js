import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';

/* eslint-disable */
const __filename = fileURLToPath(import.meta.url);
/* eslint-enable */
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const inputFormats = ['json', 'yml', 'ini'];
const outputFormats = ['stylish', 'plain', 'json'];
let expectedResult;
beforeAll(() => {
  expectedResult = {
    stylish: readFileSync(getFixturePath(`expected_stylish.txt`), 'utf-8'),
    plain: readFileSync(getFixturePath(`expected_plain.txt`), 'utf-8'),
    json: readFileSync(getFixturePath(`expected_json.json`), 'utf-8'),
  };
})

describe.each(inputFormats)('gendiff %s input format match', (extension) => {
  test.each(outputFormats)('%s format output match', (format) => {
    const path1 = getFixturePath(`file1.${extension}`);
    const path2 = getFixturePath(`file2.${extension}`);
    expect(genDiff(path1, path2, format)).toEqual(expectedResult[format]);
  })
});