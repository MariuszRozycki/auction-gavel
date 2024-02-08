import { URL_base } from "../api/index.mjs";
import { getListings } from "../all-listings/getListings.mjs";
import { createHeader } from "./createHeader.mjs";
import { renderCarousel } from "../utils/renderCarousel.mjs";
import { renderDescription } from "./renderDescription.mjs";
import { giveBid } from "./giveBid.mjs";

export const renderSingleListing = async (id) => {
  const singleListingContainer = document.querySelector("#single-listing-container");
  const giveBidContainer = document.querySelector("#give-bid-container");
  singleListingContainer.innerHTML = "";
  const userData = localStorage.getItem("USER_DATA");
  const titleNotExists = "Title not exists";
  const URL_singleListing = `${URL_base}/auction/listings/${id}?_seller=true&_bids=true`;

  try {
    const singleListingData = await getListings(URL_singleListing);

    const {
      bids,
      created,
      description,
      endsAt,
      media,
      seller: { name },
      title,
      tags,
      updated,
    } = singleListingData;

    const titleValue = title || titleNotExists;

    /* heading */
    createHeader(singleListingContainer);

    /* carousel */
    renderCarousel(id, media, title);

    /* description */
    renderDescription(title, description);

    /* give a bid */
    if (userData) giveBid(giveBidContainer, userData);
  } catch (error) {
    console.error(error);
  }
};
