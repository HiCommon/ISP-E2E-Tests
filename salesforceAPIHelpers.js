const {
  SALESFORCE_EMAIL,
  SALESFORCE_PASSWORD,
  SALESFORCE_SECURITY_KEY
} = process.env;

const logIntoSalesforce = (salesforceConnection, username, password, securityKey) => {
  return new Promise((resolve, reject) => {
    salesforceConnection.login(username, password + securityKey, (error, userInfo) => {
      if (error) {
        return reject(error);
      }
      return resolve(userInfo);
    });
  });
}

const findLeadByEmail = (salesforceConnection, email) => {
  return new Promise((resolve, reject) => {
    salesforceConnection.sobject('Lead').find({ email }).execute((error, records) => {
      if (error) {
        return reject(error);
      }
      return resolve(records);
    })
  });
};

const findAccountByEmail = (salesforceConnection, email) => {
  return new Promise((resolve, reject) => {
    salesforceConnection.sobject('Account').find({ PersonEmail: email }).execute((error, records) => {
      if (error) {
        return reject(error);
      }
      return resolve(records);
    })
  });
};

const deleteAccount = (salesforceConnection, accountId) => {
  return new Promise((resolve, reject) => {
    salesforceConnection.sobject('Account').destroy(accountId, (error, ret) => {
      if (error || !ret.success) {
        return reject(error);
      }
      return resolve(ret);
    })
  });
};

module.exports = {
  logIntoSalesforce,
  findLeadByEmail,
  findAccountByEmail,
  deleteAccount,
};