import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  const normalizeNums = (parsedData) => _.mapValues(parsedData, (value) => {
    if (_.isObject(value)) {
      return normalizeNums(value);
    }
    if (_.isString(value) && _.isFinite(Number(value))) {
      return Number(value);
    }
    return value;
  });
  return normalizeNums(ini.parse(data));
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

const parseData = (data, formatName) => {
  if (!_.has(parsers, formatName)) {
    throw new Error(`${formatName} is unknown format!`);
  }
  return parsers[formatName](data);
};

export default parseData;
