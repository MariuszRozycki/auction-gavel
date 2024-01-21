import { URL_allListings } from "../api/index.mjs";
import { search } from "../utils/search.mjs";
import { getListings } from "./getListings.mjs";
import { renderListings } from "./renderListings.mjs";
import { showMoreLessFunction } from "../utils/showMoreLessFunction.mjs";
import { renderPageNumbers } from "../utils/renderPageNumbers.mjs";

export const allListings = async () => {
  const path = location.pathname;
  const showMoreBtn = document.querySelector("#show-more-btn");
  const showLessBtn = document.querySelector("#show-less-btn");
  const limitNr = 10;
  const offsetNr = 0;
  const maxLimit = 100;
  const URL_limited_to_10 = `${URL_allListings}?limit=${limitNr}&offset=${offsetNr}`;
  if (path === "/") {
    const jsonAllListings = await getListings(URL_allListings);
    const jsonLimitedTo_10 = await getListings(URL_limited_to_10);
    renderListings(jsonLimitedTo_10, path, offsetNr + 1);
    showMoreLessFunction(showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, URL_limited_to_10, path);
    search(jsonAllListings, path, offsetNr, showLessBtn, showMoreBtn, jsonLimitedTo_10);
    // renderPageNumbers(showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, URL_limited_to_10, path);
  }
};
