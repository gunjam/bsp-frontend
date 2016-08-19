'use strict';

const {assert} = require('chai');
const isValidDateObject = require('../utils/is-valid-date-object');

describe('isValidDateObject()', () => {
  it('should return true if input properties form a valid date', () => {
    const dateObject = {day: '19', month: '08', year: '2016'};
    const output = isValidDateObject(dateObject);
    assert.isTrue(output, 'wasn\'t true when input date was valid');
  });

  it('should return false if input properties form an invalid date', () => {
    const dateObject = {day: '31', month: '02', year: '2016'};
    const output = isValidDateObject(dateObject);
    assert.isFalse(output, 'wasn\'t false when input date was invalid');
  });

  it('should return false if any input properties don\'t parse as ints', () => {
    const dateObject = {day: '31', month: 'A', year: '2016'};
    const output = isValidDateObject(dateObject);
    assert.isFalse(output, 'wasn\'t false when property doesn\'t parse as int');
  });

  it('should return false if input year property isn\'t 4 digits', () => {
    const dateObject = {day: '19', month: '01', year: '96'};
    const output = isValidDateObject(dateObject);
    assert.isFalse(output, 'wasn\'t false when input year was not 4 digits');
  });
});
