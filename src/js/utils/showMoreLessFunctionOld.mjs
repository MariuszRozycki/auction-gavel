import { URL_allListings } from "../api/index.mjs";
import { getListings } from "../all-listings/getListings.mjs";
import { renderListings } from "../all-listings/renderListings.mjs";
import { renderPageNumbers } from "./renderPageNumbers.mjs";

export const showMoreLessFunction = async (
  showMoreBtn,
  showLessBtn,
  limitNr,
  offsetNr,
  maxLimit,
  URL_limited_to_10,
  path,
) => {
  const listingsContainer = document.querySelector("#listings-container");

  let pageNr = offsetNr + limitNr;
  const updatePageNr = () => {
    pageNr = offsetNr + limitNr;
  };

  if (offsetNr + limitNr <= 10) {
    showLessBtn.classList.add("d-none");
  }

  const showMoreHandler = async () => {
    listingsContainer.innerHTML = ``;
    offsetNr += limitNr;
    URL_limited_to_10 = `${URL_allListings}?limit=${limitNr}&offset=${offsetNr}`;
    const updatedJsonWithOffset = await getListings(URL_limited_to_10);
    renderListings(updatedJsonWithOffset, path, offsetNr + 1);

    if (offsetNr + limitNr === maxLimit) {
      showMoreBtn.classList.add("d-none");
      showLessBtn.classList.remove("d-none");
    }

    if (offsetNr + limitNr > 10) {
      showLessBtn.classList.remove("d-none");
    }

    updatePageNr();
    // pageNr = offsetNr + limitNr;
    // console.log(pageNr);
  };

  const showLessHandler = async () => {
    listingsContainer.innerHTML = ``;
    offsetNr -= limitNr;
    URL_limited_to_10 = `${URL_allListings}?limit=${limitNr}&offset=${offsetNr}`;
    const updatedJsonWithOffset = await getListings(URL_limited_to_10);
    renderListings(updatedJsonWithOffset, path, offsetNr + 1);

    if (offsetNr + limitNr < maxLimit) {
      showMoreBtn.classList.remove("d-none");
      showLessBtn.classList.remove("d-none");
    }

    if (offsetNr + limitNr <= 10) {
      showLessBtn.classList.add("d-none");
    }

    updatePageNr();
    // pageNr = offsetNr + limitNr;
  };

  showMoreBtn.addEventListener("click", showMoreHandler);
  showLessBtn.addEventListener("click", showLessHandler);

  return {
    showMoreHandler,
    showLessHandler,
    getCurrentPageNr: () => pageNr,
  };
};
