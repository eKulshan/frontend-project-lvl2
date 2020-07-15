import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parseData = (data, formatName) => {
  if (!_.has(parsers, formatName)) {
    throw new Error(`${formatName} is unknown format!`);
  }
  return parsers[formatName](data);
};

export default parseData;
