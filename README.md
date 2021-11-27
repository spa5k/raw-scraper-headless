### Tips -

1. Improve performance by using same browser in a set of requests.
2. You can also use puppeteer extra alongside the plugins to improve performance as long the type of page that is going to the function is that of `Page`.

```ts
puppeteer.use(adblockerPlugin()).use(stealthPlugin());

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

blockResourcesPlugin.blockedTypes.add("media");
blockResourcesPlugin.blockedTypes.add("image");
blockResourcesPlugin.blockedTypes.add("stylesheet");
blockResourcesPlugin.blockedTypes.add("font");

for await (const item of list) {
  const data = await lastChapterInfo({
    linkSelector: item.linkSelector,
    page,
    numberSelector: item.numberSelector,
    sourceUrl: item.sourceUrl,
    titleSelector: item.titleSelector,
  });
  console.log(data);
}
```
