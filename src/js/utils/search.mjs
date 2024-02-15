import { searchListingsContent } from "./searchListingsContent.mjs";

/**
 * Enables dynamic searching within a listings page.
 * Attaches event listeners to a search form and input field to filter listings based on user input.
 * When a search is performed, it calls `searchListingsContent` to update the listings displayed based on the search query.
 * The pagination buttons are hidden when a search query is present and shown again when the query is cleared.
 *
 * @param {Object} jsonLimited The initial set of listings data to be searched.
 * @param {string} path The current page path, used to determine the context for the search.
 * @param {number} offerNr The number of offers to display per page.
 * @param {HTMLElement} showLessBtn The "Show Less" button element.
 * @param {HTMLElement} showMoreBtn The "Show More" button element.
 * @param {string} URL_allListingsSortByCreatedDate The URL to fetch listings sorted by creation date.
 *
 * @example
 * // Example usage to enable search functionality on a listings page
 * search(jsonData, '/listings', 10, document.querySelector('#show-less'), document.querySelector('#show-more'), 'https://api.example.com/listings?sort=created');
 */

export const search = async (
  jsonLimited,
  path,
  offerNr,
  showLessBtn,
  showMoreBtn,
  URL_allListingsSortByCreatedDate,
) => {
  const searchForm = document.querySelector("#search-form");
  const searchInputHome = document.querySelector("#search-input-home");
  const listingsContainer = document.querySelector("#listings-container");
  const pageNumberContainer = document.querySelector("#wrapper-page-number-btn");

  const searchHandler = async (e) => {
    e.preventDefault();
    const searchInputHomeValue = searchInputHome.value.toLowerCase();

    searchListingsContent(
      jsonLimited,
      searchInputHomeValue,
      listingsContainer,
      path,
      offerNr,
      showLessBtn,
      showMoreBtn,
      URL_allListingsSortByCreatedDate,
    );

    if (searchInputHomeValue) {
      pageNumberContainer.classList.add("d-none");
    } else {
      pageNumberContainer.classList.remove("d-none");
    }
  };

  searchInputHome.addEventListener("input", searchHandler);
  searchForm.addEventListener("submit", searchHandler);
};
