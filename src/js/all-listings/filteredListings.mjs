import { URL_allListings } from "../api/index.mjs";
import { getData } from "../getData/getData.mjs";
import { renderListings } from "./renderListings.mjs";
import { showMoreLessFunction } from "../utils/showMoreLessFunction.mjs";

/**
 * Filters listings based on selected criteria from a form.
 * @param {HTMLFormElement} formFilter Filter form for listings.
 * @param {string} URL_limited Limited URL for API requests, built dynamically based on filters.
 * @param {string} sortOrder Sorting order direction ('asc' or 'desc').
 * @param {number} limitNr Number of listings per page.
 * @param {number} offsetNr Offset for listings pagination.
 * @param {HTMLElement} showMoreBtn Button to show more listings.
 * @param {HTMLElement} showLessBtn Button to show fewer listings.
 * @param {number} maxLimit Maximum number of listings to fetch.
 * @param {string} path API path for fetching listings, appended to base URL.
 * @example
 * ```js
 * // Example of filtering listings based on selected criteria
 * filteredListings(form, 'https://api.noroff.dev/api/v1/listings?sort=created&sortOrder=asc&limit=10&offset=0&_active=true', 'asc', 10, 0, showMoreButton, showLessButton, 100, '/listings');
 * ```
 */

export const filteredListings = (
  formFilter,
  URL_limited,
  sortOrder,
  limitNr,
  offsetNr,
  showMoreBtn,
  showLessBtn,
  maxLimit,
  path,
) => {
  formFilter.addEventListener("change", async () => {
    const listingsContainer = document.querySelector("#listings-container");
    const selectedValue = formFilter.value;

    sortOrder = selectedValue;
    localStorage.setItem("SORT_ORDER", JSON.stringify(sortOrder));
    URL_limited = `${URL_allListings}?sort=created&sortOrder=${sortOrder}&limit=${limitNr}&offset=${offsetNr}&_active=true`;

    const json = await getData(URL_limited);
    listingsContainer.innerHTML = "";
    renderListings(json);

    showMoreLessFunction(showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, path, sortOrder);
  });
};
