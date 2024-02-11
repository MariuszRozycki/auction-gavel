import { createElement } from "../utils/createElement.mjs";

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
    flag = !flag;

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
