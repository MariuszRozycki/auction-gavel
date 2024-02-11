import { URL_allListings } from "../api/index.mjs";
import { getData } from "../getData/getData.mjs";
import { renderListings } from "../all-listings/renderListings.mjs";
import { renderPageNumbers } from "./renderPageNumbers.mjs";

export const showMoreLessFunction = async (showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, path, sortOrder) => {
  console.log(sortOrder, " inside showMoreLessFunction");
  const listingsContainer = document.querySelector("#listings-container");

  const updatePageNumbers = () => {
    const currentPage = Math.floor(offsetNr / limitNr) + 1;
    renderPageNumbers(currentPage, handlePageChange, listingsContainer);
  };

  const handlePageChange = async (pageNumber) => {
    const newOffsetNr = (pageNumber - 1) * limitNr;
    const URL_with_offset = `${URL_allListings}?sort=created&sortOrder=${sortOrder}&limit=${limitNr}&offset=${newOffsetNr}`;
    console.log(URL_with_offset);

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
      showLessBtn.classList.remove("d-none");
      await handlePageChange(offsetNr / limitNr + 1);
    }

    if (offsetNr + limitNr === maxLimit) {
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
