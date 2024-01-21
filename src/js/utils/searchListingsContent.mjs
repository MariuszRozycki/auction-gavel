import { renderListings } from "../all-listings/renderListings.mjs";
import { displayError } from "./displayError.mjs";

// export const searchListingsContent = async (
//   json,
//   inputValue,
//   listingsContainer,
//   path,
//   offsetNr,
//   showLessBtn,
//   showMoreBtn,
//   jsonLimitedTo_10,
// ) => {
//   showLessBtn.classList.add("d-none");
//   showMoreBtn.classList.add("d-none");
//   let searchedContent;
//   try {
//     if (inputValue === "") {
//       console.log("jsonLimitedTo_10", jsonLimitedTo_10);
//       renderListings(jsonLimitedTo_10, path, offsetNr + 1);
//       return;
//     }

//     searchedContent = json.filter((listing) => {
//       const { created, description, endsAt, id, media, tags, title, updated, _count } = listing;

//       const cardTitle = title ? title.toLowerCase().includes(inputValue) : false;
//       const cardBody = description ? description.toLowerCase().includes(inputValue) : false;
//       const cardTags = tags ? tags.some((tag) => tag.toLowerCase().includes(inputValue)) : false;

//       return cardTitle || cardBody || cardTags;
//     });

//     console.log("searchedContent", searchedContent);

//     listingsContainer.innerHTML = "";
//     renderListings(searchedContent, path, offsetNr + 1);
//   } catch (error) {
//     console.log(error);
//     displayError();
//     throw error;
//   }
// };

export const searchListingsContent = async (
  json,
  inputValue,
  listingsContainer,
  path,
  offsetNr,
  showLessBtn,
  showMoreBtn,
  jsonLimitedTo_10,
) => {
  try {
    listingsContainer.innerHTML = "";

    if (inputValue === "") {
      console.log("jsonLimitedTo_10", jsonLimitedTo_10);
      renderListings(jsonLimitedTo_10, path, offsetNr + 1);
      showMoreBtn.classList.remove("d-none");
      return;
    }

    let searchedContent = json.filter((listing) => {
      showLessBtn.classList.add("d-none");
      showMoreBtn.classList.add("d-none");

      const { title, description, tags } = listing;

      const cardTitle = title ? title.toLowerCase().includes(inputValue) : false;
      const cardBody = description ? description.toLowerCase().includes(inputValue) : false;
      const cardTags = tags ? tags.some((tag) => tag.toLowerCase().includes(inputValue)) : false;

      return cardTitle || cardBody || cardTags;
    });

    console.log("searchedContent", searchedContent);
    renderListings(searchedContent, path, offsetNr + 1);
  } catch (error) {
    console.log(error);
    displayError();
    throw error;
  }
};
