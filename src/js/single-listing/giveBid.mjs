import { URL_base } from "../api/index.mjs";
import { newBidData } from "./newBidData.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";

export const giveBid = (container, data, id) => {
  container.classList.remove("d-none");
  const dataParsed = JSON.parse(data);
  console.log("dataParsed: ", dataParsed);
  let { name, credits } = dataParsed;
  let currentlyCredits = credits;

  const giveBidForm = document.querySelector("#give-bid-form");
  const inputBid = document.querySelector("#bid");
  giveBidForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputBidValue = inputBid.value;

    credits = currentlyCredits - inputBidValue;

    dataParsed.credits = credits;
    localStorage.setItem("USER_DATA", JSON.stringify(dataParsed));

    console.log("credits", credits);
    console.log("inputBidValue", inputBidValue);

    const method = "POST";
    const URL_bidsUpdate = `${URL_base}/auction/listings/${id}/bids?_seller=true&_bids=true`;
    const newBidDataValue = newBidData(credits);
    console.log("newBidDataValue: ", newBidDataValue);

    try {
      const json = await authWithToken(method, URL_bidsUpdate, newBidDataValue);
      console.log(json);
    } catch (error) {
      console.error(error);
    }

    // if (inputBidValue > credits) {
    //   console.log(`You don't have enough credits!`);
    // }
  });
};
