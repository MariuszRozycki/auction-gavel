import { URL_base } from "../api/index.mjs";
import { getListings } from "../all-listings/getListings.mjs";
import { createHeader } from "./createHeader.mjs";
import { renderCarousel } from "../utils/renderCarousel.mjs";
import { renderDescription } from "./renderDescription.mjs";
import { giveBid } from "./giveBid.mjs";

export const renderSingleListing = async (singleListingId) => {
  const singleListingContainer = document.querySelector("#single-listing-container");
  const giveBidContainer = document.querySelector("#give-bid-container");
  singleListingContainer.innerHTML = "";
  const userData = localStorage.getItem("USER_DATA");
  const userDataParsed = JSON.parse(userData);
  console.log("userDataParsed:", userDataParsed);
  const titleNotExists = "Title not exists";
  const URL_singleListing = `${URL_base}/auction/listings/${singleListingId}?_seller=true&_bids=true`;

  try {
    const singleListingData = await getListings(URL_singleListing);

    const {
      bids,
      created,
      description,
      endsAt,
      media,
      seller: { name: sellerName },
      title,
      tags,
      updated,
    } = singleListingData;

    console.log(sellerName);

    const titleValue = title || titleNotExists;

    /* heading */
    createHeader(singleListingContainer);

    /* carousel */
    renderCarousel(singleListingId, media, title);

    /* description */
    renderDescription(title, description);

    /* give a bid */
    const { loggedUserName } = userDataParsed;
    if (sellerName !== loggedUserName) {
      giveBid(giveBidContainer, userData, singleListingId);
    }
  } catch (error) {
    console.error(error);
  }
};
