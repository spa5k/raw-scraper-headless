import { PlaywrightBlocker } from "@cliqz/adblocker-playwright";
import fetch from "cross-fetch";
import { chromium } from "playwright";

export const scraper = async (url: string): Promise<string> => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
  await blocker.enableBlockingInPage(page);
  const navigationPromise = page.waitForNavigation();

  await page.goto(url);
  await page.setViewportSize({ width: 2560, height: 1333 });
  await navigationPromise;
  await navigationPromise;

  const data = await page.content();
  await browser.close();

  return data;
};
