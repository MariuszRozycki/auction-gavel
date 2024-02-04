import { URL_base } from "../api/index.mjs";
import { URL_allListings } from "../api/index.mjs";
// import { guidGenerator } from "../utils/guidGenerator.mjs";
import { newListingData } from "./newListingData.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { getListings } from "../all-listings/getListings.mjs";

export const createNewListing = () => {
  // const guid = guidGenerator();
  const URL_newListing = URL_base + `/auction/listings`;
  const newListingForm = document.querySelector("#new-listing-form");
  console.log(URL_newListing);
  const method = "POST";

  const endsAt = document.querySelector("#new-listing-endsAt");
  endsAt.value = "2024-02-11T23:59:59.940Z";

  newListingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newListingTitleValue = document.querySelector("#new-listing-title").value;
    const newListingDescriptionValue = document.querySelector("#new-listing-description").value;
    const newListingsEndsAtValue = endsAt.value;
    console.log("newListingsEndsAtValue", newListingsEndsAtValue);
    const newListingTags = document.querySelector("#new-listing-tags").value;
    const newListingMedia = document.querySelector("#new-listing-media").value;

    const newListingsDataValue = newListingData(
      newListingTitleValue,
      newListingDescriptionValue,
      newListingsEndsAtValue,
      newListingTags,
      newListingMedia,
    );

    try {
      const json = await authWithToken(method, URL_newListing, newListingsDataValue);
      console.log("json: ", json);
      const jsonAll = await getListings(URL_allListings);
      console.log("json in createNewListing", jsonAll);
    } catch (error) {
      console.error();
    }
  });
};
