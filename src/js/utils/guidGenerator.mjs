/**
 * Generates a globally unique identifier (GUID) string.
 * This function creates a GUID using the current time and high-resolution time measurements if available.
 * It follows the version 4 UUID format, which is randomly generated and includes specific variant bits as per the standard.
 * The generated GUID is in the format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", where each "x" is replaced with a random hexadecimal digit and "y" is replaced with a value that makes the GUID conform to version 4 specifications.
 *
 * @returns {string} A string representing a version 4 UUID.
 *
 * @example
 * // Example usage to generate a GUID
 * const myGUID = guidGenerator();
 * console.log(myGUID);
 */

export const guidGenerator = () => {
  var d = new Date().getTime();
  var d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};
