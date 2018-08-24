const axios = require('axios');
const { BROWSERSTACK_USERNAME, BROWSERSTACK_KEY, BROWSERSTACK_BUILD_ID } = process.env;

exports.config = {
  user: BROWSERSTACK_USERNAME,
  key: BROWSERSTACK_KEY,

  capabilities: [
    {
      'device': 'iPhone X',
      'os_version': '11.0',
      'realMobile': 'true'
    },
    {
      'device': 'iPhone 8',
      'os_version': '11.0',
      'realMobile': 'true'
    },
    {
      'device': 'Samsung Galaxy S9',
      'os_version': '8.0',
      'realMobile': 'true'
    },
    {
      'device': 'Google Pixel',
      'os_version': '7.1',
      'realMobile': 'true'
    },
    {
      'device': 'Samsung Galaxy S8',
      'os_version': '7.0',
      'realMobile': 'true'
    },
    {
      'device': 'Google Nexus 6',
      'os_version': '6.0',
      'realMobile': 'true'
    },
    {
      'os': 'Windows',
      'os_version': '10',
      'browser': 'Chrome',
      'resolution': '1920x1080'
    },
    {
      'os': 'Windows',
      'os_version': '10',
      'browser': 'Firefox',
      'browser_version': '61.0',
      'resolution': '1920x1080'
    },
    {
      'os': 'Windows',
      'os_version': '10',
      'browser': 'Edge',
      'browser_version': '17.0',
      'resolution': '1920x1080'
    },
    {
      'os': 'Windows',
      'os_version': '10',
      'browser': 'IE',
      'browser_version': '11.0',
      'resolution': '1920x1080'
    },
    {
      'os': 'OS X',
      'os_version': 'High Sierra',
      'browser': 'Safari',
      'browser_version': '11.0',
      'resolution': '1920x1080'
    },
    {
      'os': 'OS X',
      'os_version': 'Sierra',
      'browser': 'Safari',
      'browser_version': '10.0',
      'resolution': '1024x768'
    },
    {
      'os': 'OS X',
      'os_version': 'High Sierra',
      'browser': 'Firefox',
      'browser_version': '61.0',
      'resolution': '1920x1080'
    },
    {
      'os': 'OS X',
      'os_version': 'High Sierra',
      'browser': 'Chrome',
      'browser_version': '68.0',
      'resolution': '1920x1080'
    }
  ],
  maxInstances: 10,
  specs: [
    './specs/happyPath.js'
  ],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 100000
  },
  before: function (capabilities, specs) {
    console.log('Session running at:')
    console.log(JSON.stringify(capabilities))
    console.log(`https://www.browserstack.com/automate/builds/${BROWSERSTACK_BUILD_ID}/sessions/${browser.sessionId}`)
  },
  after: function (exitCode, capabilities, specs) {
    const status = exitCode === 1 ? 'failed' : 'passed';
    return axios.put(
      `https://api.browserstack.com/automate/sessions/${browser.sessionId}.json`,
      { status },
      {
        auth: {
          username: BROWSERSTACK_USERNAME,
          password: BROWSERSTACK_KEY
        }
      }
    )
    .catch(err => {
      console.error('Error updating status:');
      console.error(err);
    });
  }
}
