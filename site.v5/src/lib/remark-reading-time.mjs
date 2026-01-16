// does some basics around calculating reading time for markdown files
// // Injects `minutesRead` and `wordCount` into the frontmatter data
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const words = textOnPage.split(/\s+/).length;

    // Average reading speed: 250 words per minute
    const readingTime = Math.ceil(words / 250);

    // This injects the data into the frontmatter object accessible in Astro
    data.astro.frontmatter.readingTime = readingTime;
    data.astro.frontmatter.wordCount = words;
  };
}
