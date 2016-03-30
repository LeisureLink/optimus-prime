let expect = require('chai').expect;
let transform = require('../src').relations;

let errorMessages = {
  nullOrUndefined: 'array-cannot-be-null-or-undefined',
  unsupportedProperty: 'unsupported-property'
};

describe('Relations transform', () => {
  let appliesTo;
  let relations;
  let transformedAppliesTo;
  let transformedRelations;
  let expectedError;

  describe('for storage', () => {
    beforeEach(() => {
      appliesTo = [
        { unitId: 'unit-1' },
        { unitId: 'unit-2' },
        { unitId: 'unit-3', ratePlanId: 'rateplan-3' },
        { pmcId: 'pmc-id-1' }
      ];

      transformedAppliesTo = [
        { source: 'unit', sourceId: 'unit-1' },
        { source: 'unit', sourceId: 'unit-2' },
        { source: 'unit-rateplan', sourceId: 'unit-3:rateplan-3' },
        { source: 'pmc', sourceId: 'pmc-id-1' }
      ];
    });

    it('should return an array', () => {
      let transformedSourceList = transform.forStorage(appliesTo);
      expect(transformedSourceList).to.be.an('array');
    });

    it('should return an error when array contains an unsupported property', () => {
      appliesTo.push({ 'unsupported-property': 'throw-error' });
      expectedError = { statusCode: 400, message: errorMessages.unsupportedProperty, cause: appliesTo[4] };

      expect(() => {
        transform.forStorage(appliesTo);
      }).to.throw();

      try {
        transform.forStorage(appliesTo);
      } catch(err){
        expect(err.message).to.eql(expectedError.message);
        expect(err.statusCode).to.eql(expectedError.statusCode);
        expect(err.cause).to.eql(expectedError.cause);
      }
    });

    it('should transform appliesTo correctly', () => {
      let transformedSourceList = transform.forStorage(appliesTo);
      expect(transformedSourceList).to.deep.equal(transformedAppliesTo);
    });

    it('should throw a graceful error if appliesTo is null', () => {
      expectedError = { statusCode: 400, message: errorMessages.nullOrUndefined };

      expect(() => {
        transform.forStorage(null);
      }).to.throw();

      try {
        transform.forStorage(null);
      } catch(err){
        expect(err.message).to.eql(expectedError.message);
        expect(err.statusCode).to.eql(expectedError.statusCode);
      }
    });

    it('should throw a graceful error if appliesTo is undefined', () => {
      expectedError = { statusCode: 400, message: errorMessages.nullOrUndefined };

      expect(() => {
        transform.forStorage(undefined);
      }).to.throw();

      try {
        transform.forStorage(undefined);
      } catch(err){
        expect(err.message).to.eql(expectedError.message);
        expect(err.statusCode).to.eql(expectedError.statusCode);
      }
    });
  });

  describe('from storage', () => {
    beforeEach(() => {
      relations = [
        { source: 'unit', sourceId: 'unit-10' },
        { source: 'unit', sourceId: 'unit-11' },
        { source: 'unit-rateplan', sourceId: 'unit-12:rateplan-12' },
        { source: 'pmc', sourceId: 'pmc-id-1' }
      ];

      transformedRelations = [
        { unitId: 'unit-10' },
        { unitId: 'unit-11' },
        { unitId: 'unit-12', ratePlanId: 'rateplan-12' }
      ];
    });

    it('should return an array', () => {
      let transformedSourceList = transform.fromStorage(relations);
      expect(transformedSourceList).to.be.an('array');
    });

    it('should return an error when array contains an unsupported property', () => {
      relations.push({ source: 'unsupported-property', sourceId: { badproperty: 'throw error' } });
      expectedError = { statusCode: 400, message: errorMessages.unsupportedProperty, cause: relations[4] };

      expect(() => {
        transform.fromStorage(relations);
      }).to.throw();

      try {
        transform.fromStorage(relations);
      } catch(err){
        expect(err.message).to.eql(expectedError.message);
        expect(err.statusCode).to.eql(expectedError.statusCode);
        expect(err.cause).to.eql(expectedError.cause);
      }
    });

    it('should transform relations correctly', () => {
      let transformedSourceList = transform.fromStorage(relations);
      expect(transformedSourceList).to.deep.equal(transformedRelations);
    });

    it('should throw a graceful error if relations is null', () => {
      expectedError = { statusCode: 400, message: errorMessages.nullOrUndefined };

      expect(() => {
        transform.fromStorage(null);
      }).to.throw();

      try {
        transform.fromStorage(null);
      } catch(err){
        expect(err.message).to.eql(expectedError.message);
        expect(err.statusCode).to.eql(expectedError.statusCode);
      }
    });

    it('should throw a graceful error if relations is undefined', () => {
      expectedError = { statusCode: 400, message: errorMessages.nullOrUndefined };

      expect(() => {
        transform.fromStorage(undefined);
      }).to.throw();

      try {
        transform.fromStorage(undefined);
      } catch(err){
        expect(err.message).to.eql(expectedError.message);
        expect(err.statusCode).to.eql(expectedError.statusCode);
      }
    });

    it('should return an empty array when passed in a relations array with just a pmc source', () => {
      let relations = [
        { source: 'pmc', sourceId: 'pmc-id-1' }
      ];

      let result = transform.fromStorage(relations);

      expect(!result.length).to.be.true;
      expect(result).to.be.an.array;
    });
  });
});
