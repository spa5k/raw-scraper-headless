/* eslint-disable @typescript-eslint/no-require-imports */
import puppeteer from "puppeteer-extra";
import adblockerPlugin from "puppeteer-extra-plugin-adblocker";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

const blockResourcesPlugin =
  require("puppeteer-extra-plugin-block-resources")();

export const scraper = async (url: string): Promise<string> => {
  puppeteer.use(adblockerPlugin()).use(stealthPlugin());

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();

  blockResourcesPlugin.blockedTypes.add("media");
  blockResourcesPlugin.blockedTypes.add("image");
  blockResourcesPlugin.blockedTypes.add("stylesheet");
  blockResourcesPlugin.blockedTypes.add("font");

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.setViewport({ width: 2560, height: 1333 });

  await navigationPromise;

  await navigationPromise;

  const data = await page.content();

  await browser.close();
  return data;
};
