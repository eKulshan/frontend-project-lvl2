import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = { stylish, plain, json: JSON.stringify };

const formatData = (data, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`${format} is unknown format!`);
  }
  return formatters[format](data);
};

export default formatData;
