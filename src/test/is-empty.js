'use strict';

const {assert} = require('chai');
const isEmpty = require('../utils/is-empty');

describe('isEmpty()', () => {
  it('should return true if input is undefined', () => {
    const output = isEmpty(undefined);
    assert.isTrue(output, 'wasn\'t true when input was undefined');
  });

  it('should return true if input is en empty string', () => {
    const output = isEmpty('');
    assert.isTrue(output, 'wasn\'t true when input was an empty string');
  });

  it('should return false if input is a string with length', () => {
    const output = isEmpty('test');
    assert.isFalse(output, 'wasn\'t false when input string had length');
  });

  it('should return false if input is an int', () => {
    const output = isEmpty(1);
    assert.isFalse(output, 'wasn\'t false when input was an int');
  });
});
