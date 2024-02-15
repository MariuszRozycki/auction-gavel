/**
 * Abbreviates a given text to a specified maximum word length and capitalizes the first character.
 * If the text is located on the homepage ('./'), it returns the text as is without abbreviation.
 * Otherwise, it abbreviates the text to the first 5 words, truncating any word longer than `maxWordLength`.
 * The first character of the resulting text is then capitalized.
 * If the text is not provided, it returns a default message indicating the element does not exist.
 *
 * @param {string} text The text to be abbreviated and capitalized.
 * @param {number} [maxWordLength=20] The maximum length a word can have before being truncated.
 * @returns {string} The abbreviated and capitalized text or a default message if the text is not provided.
 *
 * @example
 * // Example usage
 * const sampleText = "This is a very long text that should be abbreviated and capitalized";
 * console.log(abbreviateAndCapitalize(sampleText, 10));
 * // Outputs: "This is a very long text..."
 */

export function abbreviateAndCapitalize(text, maxWordLength = 20) {
  const notExists = "Element not exists";

  const path = location.pathname;

  if (!text) return notExists;
  let abbreviated;
  if (path === "./") {
    abbreviated = text;
  } else {
    abbreviated = text
      .split(" ")
      .slice(0, 5)
      .map((word) => (word.length > maxWordLength ? word.substring(0, maxWordLength) : word))
      .join(" ");
  }

  return abbreviated.charAt(0).toUpperCase() + abbreviated.slice(1);
}
