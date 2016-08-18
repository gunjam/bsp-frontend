'use strict';

const {assert} = require('chai');
const isNumeric = require('../utils/is-numeric');

describe('isNumeric()', () => {
  it('should return true if input is a string of numbers', () => {
    const output = isNumeric('012345');
    assert.isTrue(output, 'wasn\'t true when input was a string of numbers');
  });

  it('should return false if input contains non-numbers', () => {
    const output = isNumeric('A123D');
    assert.isFalse(output, 'wasn\'t false when input contained non-numbers');
  });

  it('should return false if input is empty string', () => {
    const output = isNumeric('');
    assert.isFalse(output, 'wasn\'t false when input string was empty');
  });

  it('should return false if input is not a string', () => {
    const booleanOutput = isNumeric(true);
    const intOutput = isNumeric(5);
    const objectOutput = isNumeric({});
    const arrayOutput = isNumeric([]);
    const undefinedOutput = isNumeric(undefined);
    const functionOutput = isNumeric(() => {});
    assert.isFalse(booleanOutput, 'wasn\'t false when input was a boolean');
    assert.isFalse(intOutput, 'wasn\'t false when input was an int');
    assert.isFalse(objectOutput, 'wasn\'t false when input was an object');
    assert.isFalse(arrayOutput, 'wasn\'t false when input was an array');
    assert.isFalse(undefinedOutput, 'wasn\'t false when input was undefined');
    assert.isFalse(functionOutput, 'wasn\'t false when input was a function');
  });
});
