const expect = require('chai').expect;
const faker = require('faker');
const jsforce = require('jsforce');
const {
  logIntoSalesforce,
  findLeadByEmail,
  findAccountByEmail,
  deleteAccount,
} = require('../salesforceAPIHelpers');

const {
  WEBSITE_TO_TEST,
  SALESFORCE_LOGIN_URL,
  SALESFORCE_EMAIL,
  SALESFORCE_PASSWORD,
  SALESFORCE_SECURITY_KEY
} = process.env;


describe('Happy path on Interactive Sales Path', function () {
  let salesforceConnection;
  this.beforeAll(async function() {
    salesforceConnection = new jsforce.Connection({ loginUrl: SALESFORCE_LOGIN_URL });
    await logIntoSalesforce(salesforceConnection, SALESFORCE_EMAIL, SALESFORCE_PASSWORD, SALESFORCE_SECURITY_KEY);
  });
  it('can find search results', async function() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = `${firstName} ${lastName}`;
    const phoneNumber = faker.phone.phoneNumberFormat();
    const email = `${firstName}_${lastName}_fake@hotmail.com`.toLowerCase();
    browser
      .url(WEBSITE_TO_TEST)
      .pause(2000);

    expect(browser.getTitle().match(/Application Form | Common/i));
    const firstCity = $('.cities-container .city');

    firstCity
      .click()
      .pause(2000);
    const moveDateButton = $('#move-date .buttons__inner__container .isp-button');
    moveDateButton
      .click()
      .pause(2000);
    const leaseLengthButton = $('.budget-lease-step .buttons__inner__container .isp-button:nth-child(2)');
    leaseLengthButton
      .click()
      .pause(2000);

    const budgetSubmissionButton = $('.budget-lease-step .budget-container button.isp-budget-step');
    budgetSubmissionButton
      .click()
      .pause(5000);

    const personalInfoFormSelector = '.step-container .personal-info-form-container form';
    const nameInput = $(`${personalInfoFormSelector} input.fullName`);
    nameInput.setValue(name);
    const phoneInput = $(`${personalInfoFormSelector} input.phoneNumber`);
    phoneInput.setValue(phoneNumber);
    const emailInput = $(`${personalInfoFormSelector} input.email`);
    emailInput.setValue(email);
    const personalInfoFormSubmitButton = $(`${personalInfoFormSelector} button[type="submit"]`);
    personalInfoFormSubmitButton
      .click()
      .pause(10000);

    const leads = await findLeadByEmail(salesforceConnection, email);
    expect(leads.length).to.equal(1);
    const { Email, FirstName, LastName } = leads[0];
    expect(Email).to.equal(email);
    expect(FirstName).to.equal(firstName);
    expect(LastName).to.equal(lastName);
    const accounts = await findAccountByEmail(salesforceConnection, email);
    expect(accounts.length).to.equal(1);
    const { Id } = accounts[0];
    await deleteAccount(salesforceConnection, Id);
  });
});
