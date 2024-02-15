import { URL_base } from "../api/index.mjs";
import { newListingData } from "./newListingData.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { displayError } from "../utils/displayError.mjs";

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

    const titleError = document.querySelector(".new-listing-title-error");
    const descriptionError = document.querySelector(".new-listing-description-error");
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
      let isTitleError = false;
      let isDescriptionError = false;
      let isDateError = false;
      let isMediaError = false;
      let listingCreatedSuccessFlag = false;

      const json = await authWithToken(method, URL_newListing, newListingsDataValue);
      console.log(json);
      const jsonBadRequest = !json.response.ok;

      if (jsonBadRequest) {
        const jsonErrors = json.json.errors;

        for (const error of jsonErrors) {
          const errorMessage = error.message;
          const errorDateMessage = `Field can't be empty. Date max one year from now`;

          if (errorMessage.includes("Title")) {
            isTitleError = true;
            listingCreatedSuccessFlag = true;
            titleError.classList.remove("d-none");
            titleError.innerText = errorMessage;
          }

          if (errorMessage.includes("Description")) {
            isDescriptionError = true;
            listingCreatedSuccessFlag = true;
            descriptionError.classList.remove("d-none");
            descriptionError.innerText = errorMessage;
          }

          if (errorMessage.includes("date")) {
            isDateError = true;
            listingCreatedSuccessFlag = true;
            endsAtError.classList.remove("d-none");
            endsAtError.innerText = errorDateMessage;
          }

          if (errorMessage.includes("URL")) {
            isMediaError = true;
            listingCreatedSuccessFlag = true;
            mediaError.classList.remove("d-none");
            mediaError.innerText = errorMessage;
          }

          if (!isTitleError) titleError.classList.add("d-none");
          if (!isDescriptionError) descriptionError.classList.add("d-none");
          if (!isDateError) endsAtError.classList.add("d-none");
          if (!isMediaError) mediaError.classList.add("d-none");
          if (!listingCreatedSuccessFlag) listingCreatedSuccess.classList.remove("d-none");
          if (listingCreatedSuccessFlag) listingCreatedSuccess.classList.add("d-none");
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
      displayError();
    }
  });
};
