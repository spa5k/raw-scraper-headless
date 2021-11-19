import puppeteer from "puppeteer-extra";
import adblockerPlugin from "puppeteer-extra-plugin-adblocker";
import stealthPlugin from "puppeteer-extra-plugin-stealth";

export const lastChapterInfoScraper = async (
  url: string,
  linkSelector: string,
  numberSelector: string,
  titleSelector: string
): Promise<{
  link: string;
  number: string;
  title: string;
}> => {
  puppeteer.use(adblockerPlugin()).use(stealthPlugin());

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();

  await page.goto(url);

  await page.setViewport({ width: 2560, height: 1333 });

  await navigationPromise;

  await navigationPromise;

  await page.waitForSelector(linkSelector);

  const link = await page.$eval(linkSelector, (elm) =>
    elm.getAttribute("href")
  );
  await page.waitForSelector(numberSelector);

  const numberElement = await page.$(numberSelector);
  const number: string = await page.evaluate(
    (el) => el.textContent,
    numberElement
  );

  const titleElement = await page.$(titleSelector);
  const title: string = await page.evaluate(
    (el) => el.textContent,
    titleElement
  );

  await browser.close();
  return {
    link: link ?? "",
    number: number.trim(),
    title: title.trim(),
  };
};
