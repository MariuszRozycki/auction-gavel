import { searchListingsContent } from "./searchListingsContent.mjs";

export const search = async (
  jsonLimitedTo_10,
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
      jsonLimitedTo_10,
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
