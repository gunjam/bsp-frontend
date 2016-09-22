'use strict';

const {expect} = require('chai');
const getDateFromDateObject = require('../utils/get-date-from-date-object');

describe('getDateFromDateObject()', () => {
  it('should return correct date from date form object', () => {
    const dateObject = {day: '02', month: '03', year: '2016'};
    const correctDate = new Date('2016-03-02');

    const dateOutput = getDateFromDateObject(dateObject);
    expect(dateOutput).to.deep.equal(correctDate);
  });
});
