let expect = require('chai').expect;
let transform = require('../src');

describe('Relations transform', () => {
  let appliesTo = [
    { unitId: 'unit-1' },
    { unitId: 'unit-2' },
    { unitId: 'unit-3', ratePlanId: 'rateplan-3' },
    { pmcId: 'pmc-id-1' }
  ];

  let transformedAppliesTo = [
    { source: 'unit', sourceId: 'unit-1' },
    { source: 'unit', sourceId: 'unit-2' },
    { source: 'unit-rateplan', sourceId: 'unit-3:rateplan-3' },
    { source: 'pmcId', sourceId: 'pmc-id-1' }
  ];

  let relations = [
    { source: 'unit', sourceId: 'unit-10' },
    { source: 'unit', sourceId: 'unit-11' },
    { source: 'unit-rateplan', sourceId: 'unit-12:rateplan-12' },
    { source: 'pmcId', sourceId: 'pmc-id-1' }
  ];

  let transformedRelations = [
    { unitId: 'unit-10' },
    { unitId: 'unit-11' },
    { unitId: 'unit-12', ratePlanId: 'rateplan-12' },
    { pmcId: 'pmc-id-1' }
  ];

  describe('for storage', () => {
    beforeEach(() => {
      appliesTo = [
        { unitId: 'unit-1' },
        { unitId: 'unit-2' },
        { unitId: 'unit-3', ratePlanId: 'rateplan-3' },
        { pmcId: 'pmc-id-1' }
      ];
    });

    it('should return an array', () => {
      let transformedSourceList = transform.forStorage(appliesTo);
      expect(transformedSourceList).to.be.an('array');
    });

    it('should return an error when array contains an unsupported property', () => {
      appliesTo.push({ 'unsupported-property': 'throw-error' });
      expect(() => {
        transform.forStorage(appliesTo);
      }).to.throw('unsupported-property');
    });

    it('should transform appliesTo correctly', () => {
      let transformedSourceList = transform.forStorage(appliesTo);
      expect(transformedSourceList).to.deep.equal(transformedAppliesTo);
    });

    it('should throw a graceful error if appliesTo is null', () => {
      expect(() => {
        transform.forStorage(null);
      }).to.throw('array-cannot-be-null-or-undefined');
    });

    it('should throw a graceful error if appliesTo is undefined', () => {
      expect(() => {
        transform.forStorage(undefined);
      }).to.throw('array-cannot-be-null-or-undefined');
    });
  });

  describe('from storage', () => {
    beforeEach(() => {
      relations = [
        { source: 'unit', sourceId: 'unit-10' },
        { source: 'unit', sourceId: 'unit-11' },
        { source: 'unit-rateplan', sourceId: 'unit-12:rateplan-12' },
        { source: 'pmcId', sourceId: 'pmc-id-1' }
      ];
    });

    it('should return an array', () => {
      let transformedSourceList = transform.fromStorage(relations);
      expect(transformedSourceList).to.be.an('array');
    });

    it('should return an error when array contains an unsupported property', () => {
      relations.push({ source: 'unsupported-property', sourceId: { badproperty: 'throw error' } });
      expect(() => {
        transform.fromStorage(relations);
      }).to.throw('unsupported-property');
    });

    it('should transform relations correctly', () => {
      let transformedSourceList = transform.fromStorage(relations);
      expect(transformedSourceList).to.deep.equal(transformedRelations);
    });

    it('should throw a graceful error if relations is null', () => {
      expect(() => {
        transform.fromStorage(null);
      }).to.throw('array-cannot-be-null-or-undefined');
    });

    it('should throw a graceful error if relations is undefined', () => {
      expect(() => {
        transform.fromStorage(undefined);
      }).to.throw('array-cannot-be-null-or-undefined');
    });
  });
});
