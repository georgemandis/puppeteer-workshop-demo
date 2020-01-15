const puppeteer = require('puppeteer');

const url = process.argv[2] ? process.argv[2] : false;

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto(url);
  await page.emulateMedia('screen'); // forces screen media query instead of print (default)
  await page.pdf({path: 'page.pdf'});
  await browser.close();
});