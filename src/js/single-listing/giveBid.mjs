import { URL_base } from "../api/index.mjs";
import { newBidData } from "./newBidData.mjs";
import { renderAvatarLoggedUser } from "../avatar/renderAvatarLoggedUser.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { renderDescription } from "./renderDescription.mjs";
import { showAllBids } from "./showAllBids.mjs";
import { displayError } from "../utils/displayError.mjs";

/**
 * Handles the bid submission process for a listing.
 * Validates the bid amount entered by the user, displays error messages for invalid bids,
 * and submits the bid to the server if valid. Updates the user's credits and the listing's last bid amount
 * upon a successful bid. Also updates the UI to reflect the new bid and user credits.
 *
 * @param {HTMLElement} listingDescriptionContainer The container where the listing's description is displayed.
 * @param {Object} loggedUserData Data of the logged-in user, including credits and name.
 * @param {string} singleListingId The ID of the listing being bid on.
 * @param {string} titleValue The title of the listing.
 * @param {string} description The description of the listing.
 * @param {string} sellerName The name of the seller of the listing.
 * @param {string} createdDate The creation date of the listing.
 * @param {string} endsDate The end date of the listing.
 * @param {number} lastBidAmount The amount of the last bid made on the listing.
 * @param {Array} sortedBids An array of bids made on the listing, sorted in some order.
 *
 * @example
 * // Assuming all necessary elements and data are defined
 * giveBid(listingDescriptionContainer, loggedUserData, singleListingId, titleValue, description, sellerName, createdDate, endsDate, lastBidAmount, sortedBids);
 */

export const giveBid = (
  listingDescriptionContainer,
  loggedUserData,
  singleListingId,
  titleValue,
  description,
  sellerName,
  createdDate,
  endsDate,
  lastBidAmount,
  sortedBids,
) => {
  const giveBidContainer = document.querySelector("#give-bid-container");
  const userDataContainer = document.querySelector(".user-data-container");
  const bidError = document.querySelector(".bid-error");
  const bidSuccess = document.querySelector(".bid-success");

  giveBidContainer.classList.remove("invisible");
  let { credits, name: loggedUserName } = loggedUserData;
  let updatedCredits = credits;

  const giveBidForm = document.querySelector("#give-bid-form");
  const inputBid = document.querySelector("#bid");

  giveBidForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!bidSuccess.classList.contains("d-none")) {
      bidSuccess.classList.add("d-none");
    }
    const inputBidValue = parseInt(inputBid.value, 10);

    if (inputBidValue === 0) {
      bidError.textContent = `You can't give "0" as a bid!`;
      bidError.classList.remove("d-none");
      return;
    }

    if (isNaN(inputBidValue) || inputBidValue == null) {
      bidError.textContent = `Bid must be a number, can't be empty.`;
      bidError.classList.remove("d-none");
      return;
    }

    if (inputBidValue > credits) {
      bidError.textContent = `You don't have enough credits!`;
      bidError.classList.remove("d-none");
      return;
    }

    if (inputBidValue <= lastBidAmount) {
      bidError.textContent = `Your bid must be higher than ${lastBidAmount} credits.`;
      bidError.classList.remove("d-none");
      return;
    }

    const newBidDataValue = newBidData(inputBidValue);
    try {
      const method = "POST";
      const URL_newBids = `${URL_base}/auction/listings/${singleListingId}/bids?_seller=true&_bids=true`;
      const result = await authWithToken(method, URL_newBids, newBidDataValue);

      if (!result.response.ok) {
        let errorMessage = result.json.errors.map((err) => err.message).join(", ");

        if (errorMessage.includes("current bid")) {
          errorMessage = `Your bid must be higher than ${lastBidAmount}`;
        }

        bidError.textContent = errorMessage;
        bidError.classList.remove("d-none");
        return;
      }

      lastBidAmount = inputBidValue;

      bidError.classList.add("d-none");
      bidSuccess.classList.remove("d-none");

      updatedCredits -= inputBidValue;
      loggedUserData.credits = updatedCredits;
      localStorage.setItem("USER_DATA", JSON.stringify(loggedUserData));

      sortedBids.push({ amount: inputBidValue, bidderName: loggedUserName });
      showAllBids(sortedBids);

      userDataContainer.innerHTML = "";
      renderAvatarLoggedUser();

      listingDescriptionContainer.innerHTML = "";
      renderDescription(
        listingDescriptionContainer,
        titleValue,
        description,
        sellerName,
        inputBidValue,
        createdDate,
        endsDate,
      );
    } catch (error) {
      console.error("Error submitting bid:", error);
      displayError();
    }
  });
};
