const { BROWSERSTACK_USERNAME, BROWSERSTACK_KEY } = process.env;

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
  }
}