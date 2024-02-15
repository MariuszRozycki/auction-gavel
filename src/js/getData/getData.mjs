import { displayError } from "../utils/displayError.mjs";

/**
 * Asynchronously fetches data from the specified URL and returns the parsed JSON.
 *
 * @param {string} url The URL from which to fetch data.
 * @returns {Promise<Object>} A promise that resolves with the parsed JSON data from the response.
 * @throws {Error} Rethrows any error caught during the fetch operation or JSON parsing.
 *
 * @example
 * // Example of using getData to fetch data from an API
 * const apiUrl = "https://api.example.com/data";
 * getData(apiUrl)
 *   .then(data => console.log(data))
 *   .catch(error => console.error("Failed to fetch data:", error));
 */

export const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  } catch (error) {
    displayError();
    throw error;
  }
};
