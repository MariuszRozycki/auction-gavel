import { URL_allListings } from "../api/index.mjs";
import { getData } from "../getData/getData.mjs";
import { renderListings } from "../all-listings/renderListings.mjs";
import { renderPageNumbers } from "./renderPageNumbers.mjs";

/**
 * Implements pagination functionality for listing items, including "Show More" and "Show Less" buttons.
 * Dynamically updates the listings displayed based on the current page number, limit per page, and total available listings.
 * Adjusts the visibility of "Show More" and "Show Less" buttons depending on the current offset and the maximum limit of items.
 * Also updates pagination numbers to reflect the current page state.
 *
 * @param {HTMLElement} showMoreBtn The "Show More" button element.
 * @param {HTMLElement} showLessBtn The "Show Less" button element.
 * @param {number} limitNr The number of items to display per page.
 * @param {number} offsetNr The current offset from the start of the listings.
 * @param {number} maxLimit The maximum number of items available.
 * @param {string} path The current page path, used for context in rendering listings.
 * @param {string} sortOrder The order in which listings are sorted ("asc" or "desc").
 *
 * @example
 * // Example usage to enable pagination for a listings container
 * showMoreLessFunction(document.querySelector('#show-more'), document.querySelector('#show-less'), 10, 0, 100, '/listings', 'desc');
 */

export const showMoreLessFunction = async (showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, path, sortOrder) => {
  const listingsContainer = document.querySelector("#listings-container");
  let lastRenderedListings = [];

  const updatePageNumbers = () => {
    const currentPage = Math.floor(offsetNr / limitNr) + 1;
    renderPageNumbers(currentPage, handlePageChange, listingsContainer);
  };

  const handlePageChange = async (pageNumber) => {
    const newOffsetNr = (pageNumber - 1) * limitNr;
    const URL_with_offset = `${URL_allListings}?sort=created&sortOrder=${sortOrder}&limit=${limitNr}&offset=${newOffsetNr}`;

    try {
      const updatedJsonWithOffset = await getData(URL_with_offset);
      lastRenderedListings = updatedJsonWithOffset;
      localStorage.setItem("LAST_RENDERED_LISTINGS", JSON.stringify(lastRenderedListings));
      renderListings(updatedJsonWithOffset, path, newOffsetNr + 1);
      offsetNr = newOffsetNr;
      updatePageNumbers(updatedJsonWithOffset);
    } catch (error) {
      console.error("Error loading listings:", error);
    }
  };

  showMoreBtn.addEventListener("click", async () => {
    if (offsetNr + limitNr < maxLimit) {
      listingsContainer.innerHTML = ``;
      offsetNr += limitNr;
      await handlePageChange(Math.floor(offsetNr / limitNr) + 1);
    }

    updateButtonVisibility();
  });

  showLessBtn.addEventListener("click", async () => {
    if (offsetNr - limitNr >= 0) {
      listingsContainer.innerHTML = ``;
      offsetNr -= limitNr;
      await handlePageChange(Math.floor(offsetNr / limitNr) + 1);
    }

    updateButtonVisibility();
  });

  function updateButtonVisibility() {
    if (offsetNr === 0) {
      showLessBtn.classList.add("d-none");
    } else {
      showLessBtn.classList.remove("d-none");
    }

    if (offsetNr + limitNr >= maxLimit) {
      showMoreBtn.classList.add("d-none");
    } else {
      showMoreBtn.classList.remove("d-none");
    }
  }

  updateButtonVisibility();
  updatePageNumbers();
};
