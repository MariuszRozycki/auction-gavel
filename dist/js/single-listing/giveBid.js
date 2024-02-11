import { URL_base } from "../api/index.mjs";
import { newBidData } from "./newBidData.mjs";
import { renderAvatarLoggedUser } from "../avatar/renderAvatarLoggedUser.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { renderDescription } from "./renderDescription.mjs";
import { showAllBids } from "./showAllBids.mjs";
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
  giveBidContainer.classList.remove("d-none");
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
      console.log(result.json);
      updatedCredits -= inputBidValue;
      loggedUserData.credits = updatedCredits;
      localStorage.setItem("USER_DATA", JSON.stringify(loggedUserData));
      sortedBids.push({
        amount: inputBidValue,
        bidderName: loggedUserName,
      });
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
      bidError.textContent = "An error occurred while submitting your bid.";
      bidError.classList.remove("d-none");
    }
  });
};
