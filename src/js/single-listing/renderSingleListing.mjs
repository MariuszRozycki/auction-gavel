import { URL_base } from "../api/index.mjs";
import { getData } from "../getData/getData.mjs";
import { createHeader } from "./createHeader.mjs";
import { renderCarousel } from "../utils/renderCarousel.mjs";
import { renderDescription } from "./renderDescription.mjs";
import { giveBid } from "./giveBid.mjs";
import { showAllBids } from "./showAllBids.mjs";
import { textCapitalized } from "../utils/textCapitalized.mjs";
import { displayError } from "../utils/displayError.mjs";

/**
 * Asynchronously fetches and displays details of a single listing based on its ID.
 * This function retrieves listing data, including bids, from the server and then dynamically renders
 * various components of the listing, such as a header, image carousel, description, and bid information.
 * It also initializes functionality for showing all bids and submitting a new bid if the user is logged in
 * and not the seller of the listing. The function handles any errors by displaying an error message.
 *
 * @param {string} singleListingId The unique identifier for the listing to be rendered.
 *
 * @example
 * // To be called with the ID of the listing to render its details
 * renderSingleListing('12345');
 */

export const renderSingleListing = async (singleListingId) => {
  const singleListingContainer = document.querySelector("#single-listing-container");
  const listingDescriptionContainer = document.querySelector("#listing-description-container");
  singleListingContainer.innerHTML = "";
  const userData = localStorage.getItem("USER_DATA");
  const userDataParsed = JSON.parse(userData);
  const titleNotExists = "Title not exists";
  const descriptionNotExists = "Description not exists";
  const URL_singleListing = `${URL_base}/auction/listings/${singleListingId}?_seller=true&_bids=true`;
  const showAllBidsListContainer = document.querySelector(".show-all-bids-list-container");

  try {
    const singleListingData = await getData(URL_singleListing);

    const {
      bids,
      created,
      description,
      endsAt,
      media,
      seller: { name: sellerName },
      title,
    } = singleListingData;

    const titleCapitalized = title ? textCapitalized(title) : titleNotExists;
    const descriptionCapitalized = description ? textCapitalized(description) : descriptionNotExists;
    const sellerNameCap = textCapitalized(sellerName);

    const sortedBids = bids.sort((a, b) => a.amount - b.amount);

    let lastBidAmount = 0;

    if (bids.length > 0) {
      const lastBid = bids[bids.length - 1];

      lastBidAmount = lastBid.amount;
    }

    const createdDate = new Date(created);
    const endsDate = new Date(endsAt);

    /* heading */
    createHeader(singleListingContainer);

    /* carousel */
    renderCarousel(singleListingId, media, titleCapitalized);

    /* description */
    renderDescription(
      listingDescriptionContainer,
      titleCapitalized,
      descriptionCapitalized,
      sellerNameCap,
      lastBidAmount,
      createdDate,
      endsDate,
    );

    if (userData) {
      /* showAllBids */
      showAllBidsListContainer.innerHTML = "";
      showAllBids(sortedBids);

      /* give a bid */
      if (new Date() <= endsDate) {
        const { name: loggedUserName } = userDataParsed;
        if (sellerName !== loggedUserName) {
          giveBid(
            listingDescriptionContainer,
            userDataParsed,
            singleListingId,
            titleCapitalized,
            descriptionCapitalized,
            sellerNameCap,
            createdDate,
            endsDate,
            lastBidAmount,
            sortedBids,
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
    displayError();
  }
};
