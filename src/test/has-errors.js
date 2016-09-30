'use strict';

const {assert} = require('chai');
const hasErrors = require('../utils/has-errors');

describe('hasErrors()', () => {
  it('should return true if error object has properties', () => {
    const errors = {name: 'Name is required'};
    const output = hasErrors(errors);
    assert.isTrue(output, 'wasn\'t true when object had errors');
  });

  it('should return false if error object has no properties', () => {
    const errors = {};
    const output = hasErrors(errors);
    assert.isFalse(output, 'wasn\'t false when object had no errors');
  });
});
