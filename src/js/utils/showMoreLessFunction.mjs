import { URL_allListings } from "../api/index.mjs";
import { getListings } from "../all-listings/getListings.mjs";
import { renderListings } from "../all-listings/renderListings.mjs";
import { renderPageNumbers } from "./renderPageNumbers.mjs";

export const showMoreLessFunction = async (showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, path) => {
  const listingsContainer = document.querySelector("#listings-container");

  const updatePageNumbers = (updatedJson) => {
    console.log("updatedJson", updatedJson);
    const currentPage = Math.floor(offsetNr / limitNr) + 1;
    renderPageNumbers(currentPage, handlePageChange, listingsContainer);
  };

  const handlePageChange = async (pageNumber) => {
    const newOffsetNr = (pageNumber - 1) * limitNr;
    const URL_with_offset = `${URL_allListings}?limit=${limitNr}&offset=${newOffsetNr}`;
    try {
      const updatedJsonWithOffset = await getListings(URL_with_offset);
      renderListings(updatedJsonWithOffset, path, newOffsetNr + 1);
      offsetNr = newOffsetNr;
      updatePageNumbers(updatedJsonWithOffset);
    } catch (error) {
      console.error("Error loading listings:", error);
    }
  };

  showMoreBtn.addEventListener("click", async () => {
    if (offsetNr + limitNr < maxLimit) {
      listingsContainer.innerHTML = ``;
      offsetNr += limitNr;
      showLessBtn.classList.remove("d-none");
      await handlePageChange(offsetNr / limitNr + 1);
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
      offsetNr -= limitNr;
      await handlePageChange(offsetNr / limitNr + 1);
    }

    if (offsetNr + limitNr <= maxLimit) {
      showLessBtn.classList.remove("d-none");
      showMoreBtn.classList.remove("d-none");
    }
  });

  updatePageNumbers();
};
