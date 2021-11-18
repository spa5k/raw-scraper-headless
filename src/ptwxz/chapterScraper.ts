import { load } from "cheerio";
import { parseDocument } from "htmlparser2";
import { scraper } from "../utils/scraper";

export const chapterScraper = async (): Promise<string[]> => {
  const content = await scraper(
    "https://www.ptwxz.com/html/8/8965/9656168.html"
  );

  const dom = parseDocument(content);
  const $ = load(dom);

  const chapterText = $("#content")
    .contents()
    .filter((_: number, element: { type: string }) => element.type === "text")
    .map((index: number, element) => $(element).text())
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
