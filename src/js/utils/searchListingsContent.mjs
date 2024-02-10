import { renderListings } from "../all-listings/renderListings.mjs";
import { displayError } from "./displayError.mjs";

export const searchListingsContent = async (
  jsonLimitedTo_10,
  inputValue,
  listingsContainer,
  path,
  offsetNr,
  showLessBtn,
  showMoreBtn,
  URL_allListingsSortByCreatedDate,
) => {
  try {
    listingsContainer.innerHTML = "";

    if (inputValue === "") {
      renderListings(jsonLimitedTo_10, path, offsetNr + 1);
      showMoreBtn.classList.remove("d-none");
      return;
    }

    let searchedContent = URL_allListingsSortByCreatedDate.filter((listing) => {
      showLessBtn.classList.add("d-none");
      showMoreBtn.classList.add("d-none");

      const { title, description, tags } = listing;

      const cardTitle = title ? title.toLowerCase().includes(inputValue) : false;
      const cardBody = description ? description.toLowerCase().includes(inputValue) : false;
      const cardTags = tags ? tags.some((tag) => tag.toLowerCase().includes(inputValue)) : false;

      return cardTitle || cardBody || cardTags;
    });

    renderListings(searchedContent, path, offsetNr + 1);
  } catch (error) {
    console.error(error);
    displayError();
    throw error;
  }
};
