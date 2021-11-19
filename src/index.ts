import { lastChapterInfo } from "./modules/lastChapterInfo";

const main = async () => {
  const x = await lastChapterInfo({
    sourceUrl: "https://lnmtl.com/novel/protect-our-patriarch",
    linkSelector:
      "table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)",
    numberSelector:
      "table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > span:nth-child(1)",
    titleSelector:
      "table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)",
  });
  console.log(x);
};

main().catch(console.error);
