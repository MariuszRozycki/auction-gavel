import { renderListings } from "../all-listings/renderListings.mjs";
import { displayError } from "./displayError.mjs";

/**
 * Filters and displays listings based on a user's search input.
 * Clears the listings container and either displays a limited set of listings (if no input is provided)
 * or filters the listings according to the search input across titles, descriptions, and tags.
 * Shows or hides the "Show More" and "Show Less" buttons based on the presence of search input.
 * In case of an error during the filtering process, an error message is displayed.
 *
 * @param {Array} jsonLimitedTo_10 The initial set of listings limited to 10 items or any specific number.
 * @param {string} inputValue The user's search input value.
 * @param {HTMLElement} listingsContainer The container where listings are rendered.
 * @param {string} path The current page path, used for context in rendering listings.
 * @param {number} offsetNr The offset number used for pagination.
 * @param {HTMLElement} showLessBtn The "Show Less" button element.
 * @param {HTMLElement} showMoreBtn The "Show More" button element.
 * @param {Array} URL_allListingsSortByCreatedDate The complete set of listings sorted by creation date for filtering.
 *
 * @example
 * // Example usage to enable search functionality within a listings page
 * searchListingsContent(jsonData, 'vintage lamp', document.querySelector('#listings-container'), '/listings', 0, document.querySelector('#show-less'), document.querySelector('#show-more'), allListingsData);
 */

export const searchListingsContent = async (
  jsonLimitedTo_10,
  inputValue,
  listingsContainer,
  path,
  offsetNr,
  showLessBtn,
  showMoreBtn,
  URL_allListingsSortByCreatedDate,
) => {
  try {
    listingsContainer.innerHTML = "";

    if (inputValue === "") {
      renderListings(jsonLimitedTo_10, path, offsetNr + 1);
      showMoreBtn.classList.remove("d-none");
      return;
    }

    let searchedContent = URL_allListingsSortByCreatedDate.filter((listing) => {
      showLessBtn.classList.add("d-none");
      showMoreBtn.classList.add("d-none");

      const { title, description, tags } = listing;

      const cardTitle = title ? title.toLowerCase().includes(inputValue) : false;
      const cardBody = description ? description.toLowerCase().includes(inputValue) : false;
      const cardTags = tags ? tags.some((tag) => tag.toLowerCase().includes(inputValue)) : false;

      return cardTitle || cardBody || cardTags;
    });

    renderListings(searchedContent, path, offsetNr + 1);
  } catch (error) {
    console.error(error);
    displayError();
    throw error;
  }
};
