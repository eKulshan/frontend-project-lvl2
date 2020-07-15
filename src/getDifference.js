import _ from 'lodash';

const getDifference = (data1, data2) => {
  const dataKeys = _.union(_.keys(data1), _.keys(data2)).sort();
  return dataKeys.map((key) => {
    if (!_.has(data2, key)) {
      return {
        name: key, status: 'removed', oldValue: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        name: key, status: 'added', newValue: data2[key],
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        name: key, status: 'nested', children: getDifference(data1[key], data2[key]),
      };
    }
    if (data1[key] === data2[key]) {
      return {
        name: key, status: 'unchanged', oldValue: data1[key],
      };
    }
    return {
      name: key, status: 'changed', oldValue: data1[key], newValue: data2[key],
    };
  });
};

export default getDifference;
