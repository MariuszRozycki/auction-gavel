/**
 * Capitalizes the first character of a given text string and returns the modified string.
 * The rest of the text remains unchanged. This function is useful for formatting text to ensure
 * that it starts with a capital letter, which is often desired for titles, headings, or starting sentences.
 *
 * @param {string} text The text to be capitalized.
 * @returns {string} The text with the first character capitalized.
 *
 * @example
 * // Example usage to capitalize a string
 * const myText = "hello world";
 * const capitalizedText = textCapitalized(myText);
 * console.log(capitalizedText); // Outputs: "Hello world"
 */

export const textCapitalized = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
