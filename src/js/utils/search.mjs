import { searchListingsContent } from "./searchListingsContent.mjs";

export const search = async (json, path, offerNr, showLessBtn, showMoreBtn, jsonLimitedTo_10) => {
  const searchForm = document.querySelector("#search-form");
  const searchInputHome = document.querySelector("#search-input-home");
  const listingsContainer = document.querySelector("#listings-container");

  const searchHandler = async (e) => {
    e.preventDefault();
    const searchInputHomeValue = searchInputHome.value.toLowerCase();

    searchListingsContent(
      json,
      searchInputHomeValue,
      listingsContainer,
      path,
      offerNr,
      showLessBtn,
      showMoreBtn,
      jsonLimitedTo_10,
    );
  };

  searchInputHome.addEventListener("input", searchHandler);
  searchForm.addEventListener("submit", searchHandler);
};
