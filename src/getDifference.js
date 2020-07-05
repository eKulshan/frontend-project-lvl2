import _ from 'lodash';

const getDifference = (beforeData, afterData) => {
  const dataKeys = _.union(_.keys(beforeData), _.keys(afterData)).sort();
  return dataKeys.map((key) => {
    if (!_.has(afterData, key)) {
      return {
        name: key, status: 'removed', prevValue: beforeData[key], currValue: null, children: [],
      };
    }
    if (!_.has(beforeData, key)) {
      return {
        name: key, status: 'added', prevValue: null, currValue: afterData[key], children: [],
      };
    }
    if (beforeData[key] === afterData[key]) {
      return {
        name: key, status: 'unchanged', prevValue: beforeData[key], currValue: afterData[key], children: [],
      };
    }
    if ((typeof beforeData[key] === 'object') && (typeof afterData[key] === 'object')) {
      return {
        name: key, valueType: 'obj', status: 'valuesIsObject', prevValue: beforeData[key], currValue: afterData[key], children: getDifference(beforeData[key], afterData[key]),
      };
    }
    return {
      name: key, status: 'changed', prevValue: beforeData[key], currValue: afterData[key], children: [],
    };
  });
};

export default getDifference;
