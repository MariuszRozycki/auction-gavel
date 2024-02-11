import { URL_allListings } from "../api/index.mjs";
import { getData } from "../getData/getData.mjs";
import { renderListings } from "../all-listings/renderListings.mjs";
import { renderPageNumbers } from "./renderPageNumbers.mjs";

export const showMoreLessFunction = async (showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, path, sortOrder) => {
  const listingsContainer = document.querySelector("#listings-container");

  const updatePageNumbers = () => {
    const currentPage = Math.floor(offsetNr / limitNr) + 1;
    renderPageNumbers(currentPage, handlePageChange, listingsContainer);
  };

  const handlePageChange = async (pageNumber) => {
    const newOffsetNr = (pageNumber - 1) * limitNr;
    const URL_with_offset = `${URL_allListings}?sort=created&sortOrder=${sortOrder}&limit=${limitNr}&offset=${newOffsetNr}`;

    try {
      const updatedJsonWithOffset = await getData(URL_with_offset);
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
      await handlePageChange(Math.floor(offsetNr / limitNr) + 1);
    }

    updateButtonVisibility();
  });

  showLessBtn.addEventListener("click", async () => {
    if (offsetNr - limitNr >= 0) {
      listingsContainer.innerHTML = ``;
      offsetNr -= limitNr;
      await handlePageChange(Math.floor(offsetNr / limitNr) + 1);
    }

    updateButtonVisibility();
  });

  function updateButtonVisibility() {
    if (offsetNr === 0) {
      showLessBtn.classList.add("d-none");
    } else {
      showLessBtn.classList.remove("d-none");
    }

    if (offsetNr + limitNr >= maxLimit) {
      showMoreBtn.classList.add("d-none");
    } else {
      showMoreBtn.classList.remove("d-none");
    }
  }

  updateButtonVisibility();
  updatePageNumbers();
};
