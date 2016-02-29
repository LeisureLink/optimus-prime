const sourceValueIndex = {
  unitId: 0,
  ratePlanId: 1
};

const toStorageSourceMapping = {
  'unitId': untransformedSource => {
    return {
      source: 'unit',
      sourceId: untransformedSource.unitId
    };
  },
  'unitId,ratePlanId': untransformedSource => {
    return {
      source: 'unit-rateplan',
      sourceId: untransformedSource.unitId + ':' + untransformedSource.ratePlanId
    };
  },
  'pmcId': untransformedSource => {
    return {
      source: 'pmc',
      sourceId: untransformedSource.pmcId
    };
  }
};

const fromStorageSourceMapping = {
  unit: untransformedSource => {
    return {
      unitId: untransformedSource.sourceId
    };
  },
  'unit-rateplan': untransformedSource => {
    return {
      unitId: untransformedSource.sourceId.split(':')[sourceValueIndex.unitId],
      ratePlanId: untransformedSource.sourceId.split(':')[sourceValueIndex.ratePlanId]
    };
  },
  pmc: untransformedSource => {
    return {
      pmcId: untransformedSource.sourceId
    };
  }
};

let forStorage = untransformedSourceList => {
  if(!untransformedSourceList)
    throw Error('array-cannot-be-null-or-undefined');
  return untransformedSourceList.map(untransformedSource => {
    let uniqueKey = Object.keys(untransformedSource).toString();
    try {
      return toStorageSourceMapping[uniqueKey](untransformedSource);
    } catch (err) {
      throw Error('unsupported-property');
    }
  });
};

let fromStorage = untransformedSourceList => {
  if(!untransformedSourceList)
    throw Error('array-cannot-be-null-or-undefined');
  return untransformedSourceList.map(untransformedSource => {
    try {
      return fromStorageSourceMapping[untransformedSource.source](untransformedSource);
    } catch (err) {
      throw Error('unsupported-property');
    }
  });
};

module.exports = {
  forStorage,
  fromStorage
};
