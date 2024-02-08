export const giveBid = (container, data) => {
  container.classList.remove("d-none");
  const dataParsed = JSON.parse(data);
  let { name, credits } = dataParsed;
  let currentlyCredits = credits;

  const giveBidForm = document.querySelector("#give-bid-form");
  const inputBid = document.querySelector("#bid");
  giveBidForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputBidValue = inputBid.value;

    credits = currentlyCredits - inputBidValue;

    dataParsed.credits = credits;
    localStorage.setItem("USER_DATA", JSON.stringify(dataParsed));

    console.log("credits", credits);
    console.log("inputBidValue", inputBidValue);

    // if (inputBidValue > credits) {
    //   console.log(`You don't have enough credits!`);
    // }
  });
};
