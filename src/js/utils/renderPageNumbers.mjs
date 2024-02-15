import { createElement } from "./createElement.mjs";

/**
 * Generates and displays pagination buttons for navigating through pages.
 * This function creates a series of buttons numbered from 1 to 10, allowing the user to click and navigate to different pages.
 * The current active page button is highlighted. Clicking on a button triggers a callback function to change the page content
 * and updates the active state of the clicked button.
 *
 * @param {number} currentPage The number of the currently active page.
 * @param {Function} onPageChange A callback function that is called with the new page number when a page button is clicked.
 * @param {HTMLElement} container The container element where the new page content will be rendered.
 *
 * @example
 * // Example usage to create page number buttons inside a specified container
 * const container = document.querySelector('#content-container');
 * renderPageNumbers(1, (newPage) => console.log(`Page ${newPage} clicked`), container);
 */

export const renderPageNumbers = (currentPage, onPageChange, container) => {
  const pageNumberContainer = document.querySelector("#wrapper-page-number-btn");
  pageNumberContainer.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    const buttonClasses = `page-number-btn btn btn-primary fw-medium px-3 me-2 mb-2 ${
      currentPage === i ? "active" : ""
    }`;
    const buttonPageNumber = createElement("button", buttonClasses, i.toString());

    buttonPageNumber.addEventListener("click", () => {
      container.innerHTML = ``;
      onPageChange(i);

      document.querySelectorAll(".page-number-btn.active").forEach((activeButton) => {
        activeButton.classList.remove("active");
      });

      buttonPageNumber.classList.add("active");
    });

    pageNumberContainer.appendChild(buttonPageNumber);
  }
};
