const puppeteer = require('puppeteer');

const url = process.argv[2] ? process.argv[2] : false;

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
});