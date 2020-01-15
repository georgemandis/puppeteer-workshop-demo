/**
 * Scraping with Puppeteer
 */

const puppeteer = require("puppeteer");
const url = process.argv[2] ? process.argv[2] : false;

if (!url) {
  console.log("No URL provided.");
  process.exit();
}

(async () => {  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // await page.setViewport({
  //   width: 2560,
  //   height: 1080
  // });

  try {
    await page.goto(url);
  } catch (error) {
    console.log("Error trying to retrieve page", url);
    console.log(error);
    return;
  }

  // do some scraping
  let scraped_data;

  try {
    scraped_data = await page.evaluate(() => {
      
      // data can be scraped as though you're in the
      // console in Chrome/Chromium.

      const data = {
        "title": document.title,
        "links": Array.from(document.querySelectorAll('a')).map((link)=>link.href),
        "images": Array.from(document.querySelectorAll('img')).map((img)=>img.src)
      }

      return data;
    });
    // initiate comprehend later
  } catch (error) {
    console.log(error);
  }

  await browser.close();
  
  
  console.log(scraped_data)
})();
