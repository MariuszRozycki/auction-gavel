import { createElement } from "../utils/createElement.mjs";

export const renderDescription = (title, description, seller, lastBidAmount) => {
  const listingDescriptionContainer = document.querySelector("#listing-description-container");

  const objectDetailsHeader = createElement("h2", "object-details-header", "Details: ");
  const objectDetailsWrapper = createElement("ul", "object-details-wrapper");

  const listItemTitle = createElement("li", "fs-3 object-detail-element");
  const spanItemTitle = createElement("span", "fw-bold", "Title: ");
  listItemTitle.appendChild(spanItemTitle);
  listItemTitle.append(title);

  const listItemDivider = createElement("li", "divider");
  const hr = document.createElement("hr");
  listItemDivider.appendChild(hr);

  const listItemDescription = createElement("li", "fs-3 object-detail-element");
  const spanItemDescription = createElement("span", "fw-bold", "Description: ");
  listItemDescription.appendChild(spanItemDescription);
  listItemDescription.append(description);

  const listItemSeller = createElement("li", "fs-3 object-detail-element");
  const spanItemSeller = createElement("span", "fw-bold", "Seller: ");
  listItemSeller.appendChild(spanItemSeller);
  listItemSeller.append(seller);

  const listItemLastBid = createElement("li", "fs-3 object-detail-element");
  const spanItemLastBid = createElement("span", "fw-bold", "Last bid: ");
  listItemLastBid.appendChild(spanItemLastBid);
  listItemLastBid.append(lastBidAmount + " credits");

  listingDescriptionContainer.appendChild(objectDetailsHeader);
  listingDescriptionContainer.appendChild(objectDetailsWrapper);

  objectDetailsWrapper.appendChild(listItemTitle);
  objectDetailsWrapper.appendChild(listItemDivider);
  objectDetailsWrapper.appendChild(listItemDescription);
  objectDetailsWrapper.appendChild(listItemSeller);
  objectDetailsWrapper.appendChild(listItemLastBid);
};
