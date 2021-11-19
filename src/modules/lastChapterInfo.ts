import { isUrlString } from "is-url-online";
import { lastChapterInfoScraper } from "../utils/lastChapterInfoScraper";

type Selector = {
  sourceUrl: string;
  numberSelector: string;
  linkSelector: string;
  titleSelector: string;
};

export const lastChapterInfo = async ({
  linkSelector,
  numberSelector,
  sourceUrl,
  titleSelector,
}: Selector): Promise<{
  link: string;
  number: number;
  title: string;
}> => {
  const content = await lastChapterInfoScraper(
    sourceUrl,
    linkSelector,
    numberSelector,
    titleSelector
  );

  if (content.link === "") {
    throw new Error("No link found");
  }

  if (!content.number || !content.title) {
    throw new Error("No number or title found");
  }
  const urlString = isUrlString(content.link);

  let url = content.link;
  if (!urlString) {
    const { href: absoluteUrl } = new URL(url, sourceUrl);

    url = absoluteUrl;
  }
  const number = Number.parseInt(content.number.replace(/^\D+/gu, ""));

  return {
    link: url,
    number,
    title: content.title.trim(),
  };
};
