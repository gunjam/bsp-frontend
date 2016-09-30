'use strict';

const getDateFromDateObject = require('~/src/utils/get-date-from-date-object');

module.exports = function (session) {
  const {you, partner, contact, children, bank} = session;

  return {
    dateOfClaim: new Date(),
    claimantName: you.name,
    claimantNationalInsuranceNumber: you.nino,
    claimantDateOfBirth: getDateFromDateObject(you.birth),
    partnerName: partner.name,
    partnerNationalInsuranceNumber: partner.nino,
    partnerDateOfDeath: getDateFromDateObject(partner.death),
    dependantChildren: children.dependantChildren === 'yes',
    address: {
      line1: contact.address.line1,
      line2: contact.address.line2,
      line3: contact.address.line3,
      postCode: contact.postcode
    },
    telephone: contact.telephone,
    bankAccount: {
      nameOnAccount: bank.accountName,
      accountNumber: bank.accountNumber,
      sortCode: `${bank.sortCode1}-${bank.sortCode2}-${bank.sortCode3}`,
      rollNumber: bank.rollNumber
    }
  };
};
