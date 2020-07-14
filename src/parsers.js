import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseData = (data, formatName) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.parse,
  };
  if (_.has(parsers, formatName) === false) {
    throw new Error(`${formatName} is unknown format!`);
  }
  return parsers[formatName](data);
};

export default parseData;
