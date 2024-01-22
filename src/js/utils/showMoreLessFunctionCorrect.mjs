import { URL_allListings } from "../api/index.mjs";
import { getListings } from "../all-listings/getListings.mjs";
import { renderListings } from "../all-listings/renderListings.mjs";
import { renderPageNumbers } from "./renderPageNumbers.mjs";

export const showMoreLessFunction = async (showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, path) => {
  const listingsContainer = document.querySelector("#listings-container");

  const handlePageChange = async (pageNumber) => {
    const newOffsetNr = (pageNumber - 1) * limitNr;
    const URL_with_offset = `${URL_allListings}?limit=${limitNr}&offset=${newOffsetNr}`;
    try {
      const updatedJsonWithOffset = await getListings(URL_with_offset);
      renderListings(updatedJsonWithOffset, path, newOffsetNr + 1);
      offsetNr = newOffsetNr;

      return offsetNr;
    } catch (error) {
      console.error("Error loading listings:", error);
    }
  };

  showMoreBtn.addEventListener("click", async () => {
    if (offsetNr + limitNr < maxLimit) {
      listingsContainer.innerHTML = ``;
      showLessBtn.classList.remove("d-none");
      const currentOffSetNr = await handlePageChange(offsetNr / limitNr + 2);
      console.log("currentOffSetNr moreBtn", currentOffSetNr);
    }

    if (offsetNr + limitNr === maxLimit) {
      console.log("maxLimit");
      showMoreBtn.classList.add("d-none");
      showLessBtn.classList.remove("d-none");
    }
  });

  showLessBtn.addEventListener("click", async () => {
    if (offsetNr - limitNr >= 0) {
      listingsContainer.innerHTML = ``;
      showLessBtn.classList.add("d-none");
      const currentOffSetNr = await handlePageChange(offsetNr / limitNr);
      console.log("currentOffSetNr lessBtn", currentOffSetNr);
    }

    if (offsetNr + limitNr <= maxLimit) {
      showLessBtn.classList.remove("d-none");
      showMoreBtn.classList.remove("d-none");
    }
  });

  const currentPage = Math.floor(offsetNr / limitNr) + 1;
  renderPageNumbers(currentPage, handlePageChange, listingsContainer);
};
