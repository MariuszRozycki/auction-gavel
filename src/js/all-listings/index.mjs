import { URL_allListings } from "../api/index.mjs";
import { search } from "../utils/search.mjs";
import { getListings } from "./getListings.mjs";
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
      const jsonAllListings = await getListings(URL_allListings);
      console.log("jsonAllListings", jsonAllListings);
      const jsonLimitedTo_10 = await getListings(URL_limited_to_10);

      renderListings(jsonLimitedTo_10, path, offsetNr + 1);
      showMoreLessFunction(showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, URL_limited_to_10, path);
      search(jsonAllListings, path, offsetNr, showLessBtn, showMoreBtn, jsonLimitedTo_10);
    } catch (error) {
      console.error("Error loading all listings:", error);
    }
  }
};
