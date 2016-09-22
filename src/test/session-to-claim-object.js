'use strict';

const {expect} = require('chai');
const sessionToClaimObject = require('../lib/session-to-claim-object');

describe('sessionToClaimObject()', () => {
  it('should create valid claim object from session data', () => {
    const session = {
      eligibility: {
        married: 'yes',
        dateOfDeath: 'yes',
        inUK: 'yes'
      },
      partner: {
        name: 'Dead Dave',
        nino: 'JJ123123A',
        death: {
          day: '05',
          month: '05',
          year: '2016'
        }
      },
      you: {
        name: 'Alive Alan',
        nino: 'JJ123123B',
        birth: {
          day: '12',
          month: '12',
          year: '1985'
        }
      },
      contact: {
        address: {
          line1: '123 Test Street',
          line2: 'Test Town',
          line3: 'Testershire'
        },
        postcode: 'TE57 1NG',
        telephone: '12345678'
      },
      children: {
        dependantChildren: 'yes'
      },
      payment: {
        type: 'building'
      },
      bank: {
        accountName: 'Mr A Alan',
        accountNumber: '12345678',
        sortCode1: '11',
        sortCode2: '22',
        sortCode3: '33',
        rollNumber: 'R0LL'
      }
    };
    const claim = {
      dateOfClaim: new Date(),
      claimantName: 'Alive Alan',
      claimantNationalInsuranceNumber: 'JJ123123B',
      claimantDateOfBirth: new Date('1985-12-12'),
      partnerName: 'Dead Dave',
      partnerNationalInsuranceNumber: 'JJ123123A',
      partnerDateOfDeath: new Date('2016-05-05'),
      dependantChildren: true,
      address: {
        line1: '123 Test Street',
        line2: 'Test Town',
        line3: 'Testershire',
        postCode: 'TE57 1NG'
      },
      telephone: '12345678',
      bankAccount: {
        nameOnAccount: 'Mr A Alan',
        accountNumber: '12345678',
        sortCode: '11-22-33',
        rollNumber: 'R0LL'
      }
    };
    const output = sessionToClaimObject(session);
    expect(output).to.deep.equal(claim);
  });
});
