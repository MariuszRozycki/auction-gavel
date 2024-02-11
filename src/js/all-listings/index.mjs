import { URL_allListings } from "../api/index.mjs";
import { search } from "../utils/search.mjs";
import { getData } from "../getData/getData.mjs";
import { renderListings } from "./renderListings.mjs";
import { showMoreLessFunction } from "../utils/showMoreLessFunction.mjs";

export const allListings = async () => {
  const repoName = "/auction-gavel/";
  const path = location.pathname;
  const isRootPath = path === "/" || path === "/pages/user-details/" || path.startsWith(repoName);
  const userLoggedPath = path === "/pages/user-details/";

  const limitNr = 10;
  const offsetNr = 0;
  const maxLimit = 100;
  const URL_limited_to_10 = `${URL_allListings}?sort=created&sortOrder=desc&limit=${limitNr}&offset=${offsetNr}`;
  const URL_allListingsSortByCreatedDate = `${URL_allListings}?sort=created&sortOrder=desc`;
  const testAll_URL =
    "https://nf-api.onrender.com/api/v1/auction/listings?sort=title&_active=true&_seller=true&_bids=true";

  if (userLoggedPath) {
    const createNewListingBtn = document.querySelector("#new-listing-btn");
    createNewListingBtn.addEventListener("click", () => {
      window.location.href = "../../../pages/create-new-listing/";
    });
  }

  if (isRootPath) {
    const showMoreBtn = document.querySelector("#show-more-btn");
    const showLessBtn = document.querySelector("#show-less-btn");

    try {
      const jsonAllListings = await getData(URL_allListingsSortByCreatedDate);
      const jsonLimitedTo_10 = await getData(URL_limited_to_10);
      const jsonTestAll = await getData(testAll_URL);

      // renderListings(jsonLimitedTo_10, path, offsetNr + 1);
      renderListings(jsonTestAll, path, offsetNr + 1);
      showMoreLessFunction(showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, URL_limited_to_10, path);
      search(jsonLimitedTo_10, path, offsetNr, showLessBtn, showMoreBtn, jsonAllListings);
    } catch (error) {
      console.error("Error loading all listings:", error);
    }
  }
};
