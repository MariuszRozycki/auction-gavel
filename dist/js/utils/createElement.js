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
