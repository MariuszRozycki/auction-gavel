import { createElement } from "../utils/createElement.mjs";

/**
 * Toggles the display of all bids for a listing within a specified container.
 * Initially hides the bids list and provides a button to show or hide the bids.
 * When the "Show all bids" button is clicked, it either displays all bids with bidder names and amounts
 * or hides the list, depending on the current state. The list's visibility and the button text change
 * dynamically based on user interaction.
 *
 * @param {Array} sortedBids An array of bid objects, each containing an `amount` and `bidderName`.
 *
 * @example
 * // Assuming sortedBids is an array of bid objects
 * const sortedBids = [{ amount: 100, bidderName: 'John Doe' }, { amount: 150, bidderName: 'Jane Doe' }];
 * showAllBids(sortedBids);
 */

export const showAllBids = (sortedBids) => {
  const containerShowAllBids = document.querySelector("#container-show-all-bids");
  const showAllBidsBtn = document.querySelector("#show-all-bids-btn");
  const showAllBidsListContainer = document.querySelector(".show-all-bids-list-container");

  containerShowAllBids.classList.remove("d-none");

  let flag = false;

  showAllBidsListContainer.innerHTML = "";

  if (showAllBidsListContainer.classList.contains("bg-focus-light")) {
    showAllBidsListContainer.classList.remove("bg-focus-light");
    showAllBidsBtn.innerHTML = "Show all bids";
  }

  showAllBidsBtn.addEventListener("click", () => {
    showAllBidsListContainer.innerHTML = "";
    flag = !flag;

    if (flag && sortedBids.length === 0) {
      showAllBidsListContainer.innerHTML = "There is no bids.";
    }

    if (flag) {
      showAllBidsListContainer.classList.add("bg-focus-light");
      showAllBidsBtn.innerHTML = "Close all bids";

      sortedBids.forEach((bid) => {
        const { amount, bidderName } = bid;
        const showAllBidsListItem = createElement("li", "fs-5 object-detail-element text-light");
        const spanLiBid = createElement("span", "fw-bold", "Bid: ");
        showAllBidsListItem.appendChild(spanLiBid);
        showAllBidsListItem.append(`${amount} credits, name: ${bidderName}`);
        showAllBidsListContainer.appendChild(showAllBidsListItem);
      });
    } else {
      showAllBidsListContainer.classList.remove("bg-focus-light");
      showAllBidsListContainer.innerHTML = "";
      showAllBidsBtn.innerHTML = "Show all bids";
    }
  });
};
