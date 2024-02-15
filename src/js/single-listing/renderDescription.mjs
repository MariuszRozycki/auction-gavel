import { createElement } from "../utils/createElement.mjs";

/**
 * Populates a given container with detailed information about a listing.
 * This includes the title, description, seller's name, last bid amount, creation date, and end date of the listing.
 * It dynamically creates and appends elements to display these details in a structured format.
 * If the auction has ended (based on the end date), it displays a message indicating that bidding is no longer possible.
 *
 * @param {HTMLElement} container The DOM element where the listing details will be displayed.
 * @param {string} title The title of the listing.
 * @param {string} description The description of the listing.
 * @param {string} seller The name of the seller.
 * @param {number} lastBidAmount The amount of the last bid made on the listing.
 * @param {Date} createdDate The date when the listing was created.
 * @param {Date} endsDate The date when the listing ends.
 *
 * @example
 * // Assuming there's a container element in your HTML with an id of 'listing-details-container'
 * const detailsContainer = document.querySelector('#listing-details-container');
 * renderDescription(detailsContainer, 'Vintage Lamp', 'A beautiful vintage lamp.', 'JohnDoe', 100, new Date('2023-01-01'), new Date('2023-01-10'));
 */

export const renderDescription = (container, title, description, seller, lastBidAmount, createdDate, endsDate) => {
  const objectDetailsHeader = createElement("h2", "object-details-header", "Details: ");
  const objectDetailsWrapper = createElement("ul", "object-details-wrapper");

  const listItemTitle = createElement("li", "fs-5 object-detail-element");
  const spanItemTitle = createElement("span", "fw-bold", "Title: ");
  listItemTitle.appendChild(spanItemTitle);
  listItemTitle.append(title);

  const listItemDividerFirst = createElement("li", "divider mb-3");
  const hrFirst = document.createElement("hr");
  listItemDividerFirst.appendChild(hrFirst);

  const listItemDescription = createElement("li", "fs-5 object-detail-element");
  const spanItemDescription = createElement("span", "fw-bold", "Description: ");
  listItemDescription.appendChild(spanItemDescription);
  listItemDescription.append(description);

  const listItemDividerSecond = createElement("li", "divider d-block");
  const hrSecond = createElement("hr");
  listItemDividerSecond.appendChild(hrSecond);

  const listItemSeller = createElement("li", "fs-5 object-detail-element");
  const spanItemSeller = createElement("span", "fw-bold", "Seller: ");
  listItemSeller.appendChild(spanItemSeller);
  listItemSeller.append(seller);

  const listItemLastBid = createElement("li", "fs-5 object-detail-element");
  let spanItemLastBid;

  const listItemCreatedDate = createElement("li", "fs-5 object-detail-element");
  const spanListItemCreatedDate = createElement("span", "fw-bold", "Created: ");
  listItemCreatedDate.appendChild(spanListItemCreatedDate);
  listItemCreatedDate.append(createdDate.toLocaleString());

  const listItemEnds = createElement("li", "fs-5 object-detail-element");
  const spanListItemEnds = createElement("span", "fw-bold", "Ends at: ");
  listItemEnds.appendChild(spanListItemEnds);
  listItemEnds.append(endsDate.toLocaleString());

  const messageAuctionIsEnded = createElement(
    "p",
    "error auction-is-ended",
    "Auction has finished. You can't give a bid longer!",
  );

  container.appendChild(objectDetailsHeader);
  container.appendChild(objectDetailsWrapper);

  if (new Date() > endsDate) {
    spanItemLastBid = createElement("span", "fw-bold", "Sold for: ");
    listItemLastBid.appendChild(spanItemLastBid);
    listItemLastBid.append(lastBidAmount + " credits");
    container.appendChild(messageAuctionIsEnded);
  } else {
    spanItemLastBid = createElement("span", "fw-bold", "Last bid: ");
    listItemLastBid.appendChild(spanItemLastBid);
    listItemLastBid.append(lastBidAmount + " credits");
  }

  objectDetailsWrapper.appendChild(listItemTitle);
  objectDetailsWrapper.appendChild(listItemDividerFirst);
  objectDetailsWrapper.appendChild(listItemDescription);
  objectDetailsWrapper.appendChild(listItemDividerSecond);
  objectDetailsWrapper.appendChild(listItemSeller);
  objectDetailsWrapper.appendChild(listItemLastBid);
  objectDetailsWrapper.appendChild(listItemCreatedDate);
  objectDetailsWrapper.appendChild(listItemEnds);
};
