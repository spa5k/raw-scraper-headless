const wordsTobeRemoved = new Set(["chapter", "-", ":"]);

const firstLettersToBeRemoved = new Set(["第", "#", "the"]);

export const titleCleaner = (title: string): string => {
  const words = title.split(" ").filter((word) => word.length > 0);
  console.log("word", words);

  // This will handle mainly the english translations, like in wuxiaworld.
  if (words[0].toLowerCase() === "chapter") {
    console.log("shifted");
    words.shift();
    words.shift();
  }

  // this will handle lnmtl, and both type of chinese titles
  if (firstLettersToBeRemoved.has(words[0][0].toLowerCase())) {
    words.shift();
  }

  const cleanedWords = words.filter(
    (word) => !wordsTobeRemoved.has(word.toLowerCase())
  );

  return cleanedWords.join(" ");
};
