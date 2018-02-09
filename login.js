const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));

const CREDS_FROM_CONF = require('./creds');

const CREDS = {
    username: argv.username || CREDS_FROM_CONF.username,
    password: argv.password || CREDS_FROM_CONF.password,
};

const URL = 'https://sso.ui.ac.id/cas/login';
const GW_URL = 'http://gw.hotspot.ui.ac.id';

const USERNAME_SELECTOR = '#username';
const PASSWORD_SELECTOR = '#password';
const BUTTON_SELECTOR = '#fm1 > div.bottom.clearfix > div > button';


(async () => {
  const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();
  await page.goto(URL);
  
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);
  
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);
  
  await page.click(BUTTON_SELECTOR);
  
  await page.waitForNavigation();
  await page.goto(GW_URL);
  await page.waitForNavigation();


  await browser.close();
})();