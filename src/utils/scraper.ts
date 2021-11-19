import puppeteer from "puppeteer-extra";
import adblockerPlugin from "puppeteer-extra-plugin-adblocker";
import blockResourcesPlugin from "puppeteer-extra-plugin-block-resources";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

export const scraper = async (url: string): Promise<string> => {
  puppeteer.use(adblockerPlugin()).use(stealthPlugin());

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();
  puppeteer.use(blockResourcesPlugin);
  blockResourcesPlugin.blockedTypes.add("image");

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.setViewport({ width: 2560, height: 1333 });

  await navigationPromise;

  await navigationPromise;

  const data = await page.content();

  await browser.close();
  return data;
};
