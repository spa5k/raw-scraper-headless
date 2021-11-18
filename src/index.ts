import { tocScraper } from "./ptwxz/tocScraper";

console.log("x");

const main = async () => {
  const x = await tocScraper("https://www.ptwxz.com/html/8/8965/");
  console.log(x);
};

main().catch(console.error);
