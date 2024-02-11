import { URL_allListings } from "../api/index.mjs";
import { search } from "../utils/search.mjs";
import { getData } from "../getData/getData.mjs";
import { renderListings } from "./renderListings.mjs";
import { showMoreLessFunction } from "../utils/showMoreLessFunction.mjs";
import { filteredListings } from "./filteredListings.mjs";
export const allListings = async () => {
  const repoName = "/auction-gavel/";
  const path = location.pathname;

  const isRootPath = path === "/" || path === "/pages/user-details/" || path.startsWith(repoName);
  const userLoggedPath = path === "/pages/user-details/";
  const limitNr = 10;
  const offsetNr = 0;
  const maxLimit = 1000;
  let sortOrder = "desc";
  const sortOrderLocal = localStorage.getItem("SORT_ORDER");
  if (sortOrderLocal) {
    sortOrder = JSON.parse(sortOrderLocal);
  }

  if (userLoggedPath) {
    const createNewListingBtn = document.querySelector("#new-listing-btn");
    createNewListingBtn.addEventListener("click", () => {
      window.location.href = "../../../pages/create-new-listing/";
    });
  }
  if (isRootPath) {
    const formFilter = document.querySelector(".form-filter-select");
    formFilter.value = sortOrder;
    let URL_limited = `${URL_allListings}?sort=created&sortOrder=${sortOrder}&limit=${limitNr}&offset=${offsetNr}`;
    // const URL_allListingsSortByCreatedDate = `${URL_allListings}?sort=created&sortOrder=desc`;

    const showMoreBtn = document.querySelector("#show-more-btn");
    const showLessBtn = document.querySelector("#show-less-btn");
    try {
      // const jsonAllListings = await getData(URL_allListingsSortByCreatedDate);
      const jsonLimited = await getData(URL_limited);
      renderListings(jsonLimited);
      showMoreLessFunction(showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, path, sortOrder);
      filteredListings(formFilter, URL_limited, sortOrder, limitNr, offsetNr, showMoreBtn, showLessBtn, maxLimit, path);

      // search(jsonLimited, path, offsetNr, showLessBtn, showMoreBtn, jsonAllListings);
    } catch (error) {
      console.error("Error loading all listings:", error);
    }
  }
};
