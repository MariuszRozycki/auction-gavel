/**
 * Creates a new DOM element with specified tag, class name, inner text, and additional attributes.
 * This utility function streamlines the process of creating and configuring DOM elements by allowing
 * the specification of common element properties and attributes in a single function call.
 *
 * @param {string} tag The type of element to create (e.g., 'div', 'span', 'a').
 * @param {string} [className] Optional. One or more class names to assign to the element. Separate multiple class names with spaces.
 * @param {string} [innerText] Optional. The text content of the element.
 * @param {Object} [attrs] Optional. An object containing attribute key-value pairs to set on the element.
 * @returns {HTMLElement} The newly created and configured DOM element.
 *
 * @example
 * // Example usage to create a new paragraph element with text and a custom attribute
 * const pElement = createElement('p', 'text-primary', 'Hello, world!', { 'data-custom': 'value' });
 * document.body.appendChild(pElement);
 */

export function createElement(tag, className, innerText, attrs) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerText) element.innerText = innerText;
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      element.setAttribute(key, value);
    }
  }
  return element;
}
