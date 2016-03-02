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
  }
};

let constructError = (statusCode, message) => {
  return {
    statusCode,
    message
  };
};

let errorMessages = {
  nullOrUndefined: 'array-cannot-be-null-or-undefined',
  unsupportedProperty: 'unsupported-property'
};

let removePmcId = relations => {
  return relations.filter(relation => {
    return relation.source !== 'pmc' ;
  });
};

let forStorage = untransformedSourceList => {
  if(!untransformedSourceList)
    throw constructError(400, errorMessages.nullOrUndefined);
  return untransformedSourceList.map(untransformedSource => {
    let uniqueKey = Object.keys(untransformedSource).toString();
    try {
      return toStorageSourceMapping[uniqueKey](untransformedSource);
    } catch (err) {
      throw constructError(400, errorMessages.unsupportedProperty);
    }
  });
};

let fromStorage = untransformedSourceList => {
  if(!untransformedSourceList)
    throw constructError(400, errorMessages.nullOrUndefined);
  untransformedSourceList = removePmcId(untransformedSourceList);
  return untransformedSourceList.map(untransformedSource => {
    try {
      return fromStorageSourceMapping[untransformedSource.source](untransformedSource);
    } catch (err) {
      throw constructError(400, errorMessages.unsupportedProperty);
    }
  });
};

module.exports = {
  forStorage,
  fromStorage
};
