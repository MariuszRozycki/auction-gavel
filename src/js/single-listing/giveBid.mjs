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
  // const showAllBidsListContainer = document.querySelector(".show-all-bids-list-container");

  giveBidContainer.classList.remove("d-none");
  let { credits, name: loggedUserName } = loggedUserData;
  let updatedCredits = credits;

  const giveBidForm = document.querySelector("#give-bid-form");
  const inputBid = document.querySelector("#bid");

  giveBidForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputBidValue = parseInt(inputBid.value, 10);

    if (inputBidValue > credits) {
      console.log(`You don't have enough credits!`);
    }

    if (inputBidValue <= lastBidAmount) {
      console.log(`Your bid must be higher then ${lastBidAmount}`);
    }

    const newBidDataValue = newBidData(inputBidValue);
    const method = "POST";
    const URL_bidsUpdate = `${URL_base}/auction/listings/${singleListingId}/bids?_seller=true&_bids=true`;

    try {
      const json = await authWithToken(method, URL_bidsUpdate, newBidDataValue);
      console.log(json);

      updatedCredits -= inputBidValue;
      loggedUserData.credits = updatedCredits;
      localStorage.setItem("USER_DATA", JSON.stringify(loggedUserData));
      console.log(loggedUserData);

      sortedBids.push({ amount: inputBidValue, bidderName: loggedUserName });
      // sortedBids.sort((a, b) => a.amount - b.amount);

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

      // showAllBidsListContainer.innerHTML = "";
      showAllBids(sortedBids);
    } catch (error) {
      console.error(error);
    }

    // credits = updatedCredits - inputBidValue;
    // loggedUserData.credits = credits;
    // localStorage.setItem("USER_DATA", JSON.stringify(loggedUserData));

    // const newBidDataValue = newBidData(inputBidValue);
  });
};
