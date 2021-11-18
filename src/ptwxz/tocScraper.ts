import { toArabicString } from "chinese-numbers-to-arabic";
import type { QuickCrawlerOutput } from "quick-scraper";
import { scrapeHtml } from "quick-scraper";
import { scraper } from "../utils/scraper";

export const tocScraper = async (
  url: string
): Promise<
  {
    number: number;
    title: string;
    url: string;
  }[]
> => {
  const content = await scraper(url);
  let data: QuickCrawlerOutput;
  try {
    data = await scrapeHtml({
      html: content,
      options: {
        chapters: {
          selector: ".centent > ul> li > a",
          listItem: true,
          href: true,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error while scrapingggggggggg");
  }

  const chaptersArray = data.data.chapters.lists;

  const chaptersData = [];

  if (chaptersArray?.length === 0 || !chaptersArray) {
    throw new Error("Some error happened while scraping");
  }

  for (const chapter of chaptersArray) {
    const chapterNumberString = toArabicString(
      chapter.text?.split(" ")[0] as string
    );

    if (!chapterNumberString.startsWith("第")) {
      continue;
    }

    const chapterNumber = chapterNumberString.replace(/\D/gu, "");
    const chapterTitle = chapter.text?.split(" ")[1];
    const chapterUrl = chapter.href;

    if (chapterNumber && chapterTitle && chapterUrl) {
      chaptersData.push({
        number: Number.parseInt(chapterNumber),
        title: chapterTitle,
        url: chapterUrl,
      });
    }
  }
  return chaptersData;
};
