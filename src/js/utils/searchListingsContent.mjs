import { renderListings } from "../all-listings/renderListings.mjs";
import { displayError } from "./displayError.mjs";

export const searchListingsContent = async (json, inputValue, listingsContainer, path) => {
  let searchedContent;
  try {
    searchedContent = json.filter((listing) => {
      const { created, description, endsAt, id, media, tags, title, updated, _count } = listing;

      const cardTitle = title ? title.toLowerCase().includes(inputValue) : false;
      const cardBody = description ? description.toLowerCase().includes(inputValue) : false;
      const cardTags = tags ? tags.some((tag) => tag.toLowerCase().includes(inputValue)) : false;

      return cardTitle || cardBody || cardTags;
    });

    console.log("searchedContent", searchedContent);

    listingsContainer.innerHTML = "";
    // allPostsHeader.innerText = "Searched content:";
    // filterOption.style = "display: none";

    // if (inputValue === "") {
    //   allPostsHeader.innerText = "All posts:";
    //   filterOption.style = "display: block";
    // }
    renderListings(searchedContent, path);
  } catch (error) {
    console.log(error);
    displayError();
    throw error;
  }
};
