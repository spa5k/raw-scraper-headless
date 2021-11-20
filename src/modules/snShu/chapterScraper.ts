import { load } from "cheerio";
import { parseDocument } from "htmlparser2";
import type { Page } from "puppeteer";
import { scraper } from "../../utils/scraper";

export const snChapterScraper = async (page: Page): Promise<string[]> => {
  const content = await scraper(
    "https://www.ptwxz.com/html/8/8965/9656168.html",
    page
  );

  if (!content) {
    throw new Error("No content found for the page");
  }

  const dom = parseDocument(content);
  const $ = load(dom);

  const chapterText = $(".txtnav")
    .contents()
    .filter((_: number, element: { type: string }) => element.type === "text")
    .map((_index: number, element) => $(element).text())
    .get();

  const chapterOutput: string[] = [];

  chapterText.forEach((str) => {
    const trimmedStr = str.trim();
    if (trimmedStr.length > 0) {
      chapterOutput.push(trimmedStr);
    }
  });

  return chapterOutput;
};
