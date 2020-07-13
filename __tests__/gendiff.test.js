import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const extensions = ['json', 'yml', 'ini'];
const formats = ['stylish', 'plain', 'json'];
let expected;
beforeAll(() => {
  expected = {};
  expected.stylish = readFileSync(getFixturePath(`expected_stylish.txt`), 'utf-8');
  expected.plain = readFileSync(getFixturePath(`expected_plain.txt`), 'utf-8');
  expected.json = readFileSync(getFixturePath(`expected_json.json`), 'utf-8');
})

describe.each(extensions)('gendiff %s output match', (extension) => {
  test.each(formats)('%s format output match', (format) => {
    const path1 = getFixturePath(`file1.${extension}`);
    const path2 = getFixturePath(`file2.${extension}`);
    expect(genDiff(path1, path2, format)).toEqual(expected[format]);
  })
});