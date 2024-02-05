import { URL_base } from "../api/index.mjs";
import { newListingData } from "./newListingData.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";

export const createNewListing = () => {
  const listingCreatedSuccess = document.querySelector("#new-listing-created");
  const URL_newListing = URL_base + `/auction/listings`;
  const newListingForm = document.querySelector("#new-listing-form");
  const method = "POST";

  newListingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newListingTitle = document.querySelector("#new-listing-title");
    const newListingDescription = document.querySelector("#new-listing-description");
    const newListingsEndsAt = document.querySelector("#new-listing-endsAt");
    const newListingTags = document.querySelector("#new-listing-tags");
    const newListingMedia = document.querySelector("#new-listing-media");

    const newListingTitleValue = newListingTitle.value;
    const newListingDescriptionValue = newListingDescription.value;
    const newListingsEndsAtValue = newListingsEndsAt.value;
    const newListingTagsValue = newListingTags.value;
    const newListingMediaValue = newListingMedia.value;

    const endsAtError = document.querySelector(".new-listing-endsAt-error");
    const mediaError = document.querySelector(".new-listing-media-error");

    const newListingsDataValue = newListingData(
      newListingTitleValue,
      newListingDescriptionValue,
      newListingsEndsAtValue,
      newListingTagsValue,
      newListingMediaValue,
    );

    try {
      let isDateError = false;
      let isMediaError = false;
      let listingCreatedFailure = false;

      const json = await authWithToken(method, URL_newListing, newListingsDataValue);
      const jsonBadRequest = json.json.status;

      if (jsonBadRequest) {
        const jsonErrors = json.json.errors;

        for (const error of jsonErrors) {
          const errorMessage = error.message;

          switch (true) {
            case errorMessage.includes("date"):
              isDateError = true;
              listingCreatedFailure = true;
              endsAtError.classList.remove("d-none");
              endsAtError.innerText = `${errorMessage}`;
              break;
            case errorMessage.includes("URL"):
              isMediaError = true;
              listingCreatedFailure = true;
              mediaError.classList.remove("d-none");
              mediaError.innerText = `${errorMessage}`;
              break;
            default:
          }

          if (!isDateError) endsAtError.classList.add("d-none");
          if (!isMediaError) mediaError.classList.add("d-none");
          if (!listingCreatedFailure) listingCreatedSuccess.classList.remove("d-none");
        }
      } else {
        newListingTitle.value = "";
        newListingDescription.value = "";
        newListingsEndsAt.value = "";
        newListingTags.value = "";
        newListingMedia.value = "";

        endsAtError.classList.add("d-none");
        mediaError.classList.add("d-none");

        listingCreatedSuccess.classList.remove("d-none");
      }
    } catch (error) {
      console.error();
    }
  });
};
