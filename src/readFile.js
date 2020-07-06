import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const fullPathToFile = (filepath.startsWith('/')) ? filepath : path.resolve(process.cwd(), filepath);
  const format = path.extname(filepath);
  const data = fs.readFileSync(fullPathToFile, 'utf-8');
  return [data, format];
};

export default readFile;
