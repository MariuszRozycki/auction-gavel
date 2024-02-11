/* dzialajacy kod */
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
    const inputBidValue = parseInt(inputBid.value, 10);

    // Przed wysłaniem żądania sprawdź, czy użytkownik ma wystarczająco kredytów i czy oferta jest wyższa niż ostatnia
    if (inputBidValue > credits) {
      bidError.textContent = `You don't have enough credits!`;
      bidError.classList.remove("d-none");
      return;
    }

    if (inputBidValue <= lastBidAmount) {
      bidError.textContent = `Your bid must be higher than ${lastBidAmount}`;
      bidError.classList.remove("d-none");
      return;
    }

    const newBidDataValue = newBidData(inputBidValue);
    try {
      const result = await authWithToken(
        "POST",
        `${URL_base}/auction/listings/${singleListingId}/bids?_seller=true&_bids=true`,
        newBidDataValue,
      );

      // Teraz możemy użyć result.json do dostępu do danych JSON, result.response do dostępu do obiektu odpowiedzi
      // Sprawdź, czy status odpowiedzi wskazuje na sukces
      if (!result.response.ok) {
        // Załóżmy, że błędy są zwracane jako { errors: [{ message: "Error message" }] }
        const errorMessage = result.json.errors.map((err) => err.message).join(", ");
        bidError.textContent = errorMessage;
        bidError.classList.remove("d-none");
        return;
      }

      // Jeśli odpowiedź jest ok, kontynuuj aktualizowanie UI
      bidError.classList.add("d-none");
      bidSuccess.classList.remove("d-none");
      console.log(result.json);

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
      bidError.textContent = "An error occurred while submitting your bid.";
      bidError.classList.remove("d-none");
    }
  });
};
