import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const iniParse = (data) => {
  const normalizeNums = (parsedData) => {
    const result = Object.entries(parsedData).reduce((acc, [key, value]) => {
      if (_.isObject(value)) {
        acc[key] = normalizeNums(value);
        return acc;
      }
      if (_.isNaN(parseInt(value, 10))) {
        acc[key] = value;
        return acc;
      }
      acc[key] = parseInt(value, 10);
      return acc;
    }, {});
    return result;
  };
  return normalizeNums(ini.parse(data));
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: iniParse,
};

const parseData = (data, formatName) => {
  if (!_.has(parsers, formatName)) {
    throw new Error(`${formatName} is unknown format!`);
  }
  return parsers[formatName](data);
};

export default parseData;
