import yaml from 'js-yaml';
import ini from 'ini';

const parseData = ([data, format]) => {
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  } else if (format === '.ini') {
    parse = ini.parse;
  }
  return parse(data);
};

export default parseData;
