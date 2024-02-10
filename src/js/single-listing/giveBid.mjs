import { URL_base } from "../api/index.mjs";
import { newBidData } from "./newBidData.mjs";
import { renderAvatarLoggedUser } from "../avatar/renderAvatarLoggedUser.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { renderDescription } from "./renderDescription.mjs";

export const giveBid = (
  listingDescriptionContainer,
  loggedUserData,
  singleListingId,
  titleValue,
  description,
  sellerName,
  lastBidAmount,
) => {
  const giveBidContainer = document.querySelector("#give-bid-container");
  const userDataContainer = document.querySelector(".user-data-container");

  giveBidContainer.classList.remove("d-none");
  let { credits } = loggedUserData;
  let updatedCredits = credits;

  const giveBidForm = document.querySelector("#give-bid-form");
  const inputBid = document.querySelector("#bid");

  console.log("listingDescriptionContainer: ", listingDescriptionContainer);

  giveBidForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputBidValue = parseInt(inputBid.value, 10);
    console.log(typeof inputBidValue);
    console.log("credits before give a bid: ", credits);
    credits = updatedCredits - inputBidValue;

    loggedUserData.credits = credits;
    localStorage.setItem("USER_DATA", JSON.stringify(loggedUserData));

    console.log("credits after", credits);
    console.log("inputBidValue", inputBidValue);

    const method = "POST";
    const URL_bidsUpdate = `${URL_base}/auction/listings/${singleListingId}/bids?_seller=true&_bids=true`;
    const newBidDataValue = newBidData(inputBidValue);
    console.log("newBidDataValue: ", newBidDataValue);

    try {
      const json = await authWithToken(method, URL_bidsUpdate, newBidDataValue);
      console.log(json);

      userDataContainer.innerHTML = "";
      renderAvatarLoggedUser();
      listingDescriptionContainer.innerHTML = "";
      renderDescription(listingDescriptionContainer, titleValue, description, sellerName, inputBidValue);
    } catch (error) {
      console.error(error);
    }

    if (inputBidValue > credits) {
      console.log(`You don't have enough credits!`);
    }
  });
};
