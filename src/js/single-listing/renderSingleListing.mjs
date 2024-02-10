import { URL_base } from "../api/index.mjs";
import { getListings } from "../all-listings/getListings.mjs";
import { createHeader } from "./createHeader.mjs";
import { renderCarousel } from "../utils/renderCarousel.mjs";
import { renderDescription } from "./renderDescription.mjs";
import { giveBid } from "./giveBid.mjs";

export const renderSingleListing = async (singleListingId) => {
  const singleListingContainer = document.querySelector("#single-listing-container");
  const listingDescriptionContainer = document.querySelector("#listing-description-container");
  singleListingContainer.innerHTML = "";
  const userData = localStorage.getItem("USER_DATA");
  const userDataParsed = JSON.parse(userData);
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
    console.log("singleListingContainer: ", singleListingData);

    bids.sort((a, b) => a.amount - b.amount);

    let lastBidAmount = 0;

    if (bids.length > 0) {
      const lastBid = bids[bids.length - 1];

      lastBidAmount = lastBid.amount;
    }

    const createdDate = new Date(created);
    const endsDate = new Date(endsAt);

    const titleValue = title || titleNotExists;

    /* heading */
    createHeader(singleListingContainer);

    /* carousel */
    renderCarousel(singleListingId, media, titleValue);

    /* description */
    renderDescription(
      listingDescriptionContainer,
      titleValue,
      description,
      sellerName,
      lastBidAmount,
      createdDate,
      endsDate,
    );

    /* give a bid */
    if (new Date() > endsDate) {
      return;
    } else {
      const { name: loggedUserName } = userDataParsed;
      if (sellerName !== loggedUserName) {
        giveBid(
          listingDescriptionContainer,
          userDataParsed,
          singleListingId,
          titleValue,
          description,
          sellerName,
          createdDate,
          endsDate,
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};
