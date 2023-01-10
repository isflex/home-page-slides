const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  executablePath: '/usr/bin/google-chrome',
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  args: [
    '--disable-dev-shm-usage',
    '--disable-infobars'
  ]
};