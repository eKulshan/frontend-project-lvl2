import _ from 'lodash';
import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatters = { stylish: makeStylish, plain: makePlain, json: JSON.stringify };

const formatData = (data, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`${format} is unknown format!`);
  }
  return formatters[format](data);
};

export default formatData;
