/**
 * Prepares the request body for HTTP methods other than GET by converting data to a JSON string.
 * If the request method is GET or data is not provided, the body remains undefined.
 * @param {string} method The HTTP method to be used for the request.
 * @param {Object} data The data to be sent with the request, which will be converted to a JSON string if applicable.
 * @returns {string|undefined} A stringified JSON representation of the data or undefined if the method is GET or data is not provided.
 * @example
 * ```js
 * // Example of using createBodyJson for a POST request
 * const data = { username: 'user', password: 'pass' };
 * const body = createBodyJson('POST', data);
 * // body is '{"username":"user","password":"pass"}'
 *
 * // Example for a GET request
 * const bodyForGet = createBodyJson('GET', data);
 * // bodyForGet is undefined
 * ```
 */

export function createBodyJson(method, data) {
  let body;
  if (method !== "GET" && data) {
    body = JSON.stringify(data);
  }

  return body;
}
