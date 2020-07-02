import _ from 'lodash';

const getDifference = (beforeData, afterData) => {
  const dataKeys = _.union(_.keys(beforeData), _.keys(afterData)).sort();
  const result = dataKeys.map((key) => {
    if (!_.has(afterData, key)) {
      return {
        name: key, valueType: 'val', status: 'removed', prevValue: beforeData[key], currValue: null, children: [],
      };
    }
    if (!_.has(beforeData, key)) {
      return {
        name: key, valueType: 'val', status: 'added', prevValue: null, currValue: afterData[key], children: [],
      };
    }
    if (beforeData[key] === afterData[key]) {
      return {
        name: key, valueType: 'val', status: 'unchanged', prevValue: beforeData[key], currValue: afterData[key], children: [],
      };
    }
    if ((typeof beforeData[key] === 'object') && (typeof afterData[key] === 'object')) {
      return {
        name: key, valueType: 'obj', status: 'valueCompare', prevValue: beforeData[key], currValue: afterData[key], children: getDifference(beforeData[key], afterData[key]),
      };
    }
    return {
      name: key, valueType: 'val', status: 'changed', prevValue: beforeData[key], currValue: afterData[key], children: [],
    };
  });
  return result;
};

export default getDifference;
