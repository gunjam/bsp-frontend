'use strict';

const {assert} = require('chai');
const isYesOrNo = require('../utils/is-yes-or-no');

describe('isYesOrNo()', () => {
  it('should return true if input is "yes"', () => {
    const output = isYesOrNo('yes');
    assert.isTrue(output, 'wasn\'t true when input was "yes"');
  });

  it('should return true if input is "no"', () => {
    const output = isYesOrNo('no');
    assert.isTrue(output, 'wasn\'t false when input contained non-numbers');
  });

  it('should return false if input is "yes" or "no" but not lower case', () => {
    const outputYES = isYesOrNo('YES');
    const outputNO = isYesOrNo('NO');
    const outputYes = isYesOrNo('Yes');
    const outputNo = isYesOrNo('No');
    assert.isFalse(outputYES, 'wasn\'t false when input was "YES"');
    assert.isFalse(outputNO, 'wasn\'t false when input was "NO"');
    assert.isFalse(outputYes, 'wasn\'t false when input was "Yes"');
    assert.isFalse(outputNo, 'wasn\'t false when input was "No"');
  });

  it('should return false if input is not "yes" or "no"', () => {
    const stringOutput = isYesOrNo('true');
    const booleanOutput = isYesOrNo(true);
    const intOutput = isYesOrNo(5);
    const objectOutput = isYesOrNo({});
    const arrayOutput = isYesOrNo([]);
    const undefinedOutput = isYesOrNo(undefined);
    const functionOutput = isYesOrNo(() => {});
    assert.isFalse(stringOutput, 'wasn\'t false when input was a "true"');
    assert.isFalse(booleanOutput, 'wasn\'t false when input was a boolean');
    assert.isFalse(intOutput, 'wasn\'t false when input was an int');
    assert.isFalse(objectOutput, 'wasn\'t false when input was an object');
    assert.isFalse(arrayOutput, 'wasn\'t false when input was an array');
    assert.isFalse(undefinedOutput, 'wasn\'t false when input was undefined');
    assert.isFalse(functionOutput, 'wasn\'t false when input was a function');
  });
});
