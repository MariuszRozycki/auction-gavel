/**
 * Controls the visibility of the search form in the navigation bar based on screen width.
 * Initially hides the search form when the function is called, and sets up an event listener
 * to toggle the search form's visibility on window resize. The search form is hidden by default
 * and does not become visible regardless of screen size due to the logic in `toggleSearchVisibility`.
 *
 * Note: The current implementation always hides the search form due to the condition in `toggleSearchVisibility`.
 * To make the search form responsive, adjust the condition to check for specific screen widths.
 *
 * @example
 * // To be called when the page loads to handle search form visibility
 * navSearchDisplay();
 */

export const navSearchDisplay = () => {
  const navSearch = document.querySelector('form[role="search"]');

  const toggleSearchVisibility = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 0) {
      navSearch.classList.remove("d-flex");
      navSearch.classList.add("d-none");
    } else {
      navSearch.classList.remove("d-none");
      navSearch.classList.add("d-flex");
    }
  };

  window.addEventListener("resize", toggleSearchVisibility);
  toggleSearchVisibility();
};
