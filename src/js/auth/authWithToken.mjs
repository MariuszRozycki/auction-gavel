import { createBodyJson } from "./createBodyJson.mjs";
import { displayError } from "../utils/displayError.mjs";

/**
 * Performs an authenticated HTTP request using a provided method, URL, and data.
 * Utilizes a token stored in localStorage for authentication.
 * Converts data to JSON format and includes it in the request if necessary.
 * Handles both successful and error responses, returning JSON data and response status.
 * In case of an error, displays an error message using a utility function.
 * @async
 * @param {string} method HTTP method to be used for the request (e.g., 'GET', 'POST').
 * @param {string} url URL to which the request is sent.
 * @param {Object} data Data to be sent with the request, will be converted to JSON.
 * @returns {Promise<{json: Object, status: number, response: Response}>} An object containing the JSON response, status code, and the full response object.
 * @throws Will throw an error if the request fails for any reason.
 * @example
 * ```js
 * // Example of using authWithToken to make an authenticated POST request
 * const data = { username: 'example', password: 'password' };
 * authWithToken('POST', 'https://api.noroff.dev/api/v1/auth', data)
 *   .then(({ json, status, response }) => console.log(json, status))
 *   .catch(error => console.error(error));
 * ```
 */

export async function authWithToken(method, url, data) {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    let body = createBodyJson(method, data);

    const fetchOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    };

    const response = await fetch(url, fetchOptions);
    const json = await response.json();

    return {
      json: json,
      status: response.json,
      response,
    };
  } catch (error) {
    displayError(error);
    throw error;
  }
}
