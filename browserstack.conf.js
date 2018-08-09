const { BROWSERSTACK_USERNAME, BROWSERSTACK_KEY } = process.env;

exports.config = {
  user: BROWSERSTACK_USERNAME,
  key: BROWSERSTACK_KEY,

  capabilities: [{
    browser: 'chrome'
  }],
  specs: [
    './specs/happyPath.js'
  ],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 100000
  }
}