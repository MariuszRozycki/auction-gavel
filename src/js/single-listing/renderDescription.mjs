import { createElement } from "../utils/createElement.mjs";

export const renderDescription = (container, title, description, seller, lastBidAmount, createdDate, endsDate) => {
  const objectDetailsHeader = createElement("h2", "object-details-header", "Details: ");
  const objectDetailsWrapper = createElement("ul", "object-details-wrapper");

  const listItemTitle = createElement("li", "fs-4 object-detail-element");
  const spanItemTitle = createElement("span", "fw-bold", "Title: ");
  listItemTitle.appendChild(spanItemTitle);
  listItemTitle.append(title);

  const listItemDividerFirst = createElement("li", "divider mb-3");
  const hrFirst = document.createElement("hr");
  listItemDividerFirst.appendChild(hrFirst);

  const listItemDescription = createElement("li", "fs-4 object-detail-element");
  const spanItemDescription = createElement("span", "fw-bold", "Description: ");
  listItemDescription.appendChild(spanItemDescription);
  listItemDescription.append(description);

  const listItemDividerSecond = createElement("li", "divider d-block");
  const hrSecond = createElement("hr");
  listItemDividerSecond.appendChild(hrSecond);

  const listItemSeller = createElement("li", "fs-4 object-detail-element");
  const spanItemSeller = createElement("span", "fw-bold", "Seller: ");
  listItemSeller.appendChild(spanItemSeller);
  listItemSeller.append(seller);

  const listItemLastBid = createElement("li", "fs-4 object-detail-element");
  const spanItemLastBid = createElement("span", "fw-bold", "Last bid: ");
  listItemLastBid.appendChild(spanItemLastBid);
  listItemLastBid.append(lastBidAmount + " credits");

  const listItemCreatedDate = createElement("li", "fs-4 object-detail-element");
  const spanListItemCreatedDate = createElement("span", "fw-bold", "Created: ");
  listItemCreatedDate.appendChild(spanListItemCreatedDate);
  listItemCreatedDate.append(createdDate.toLocaleString());

  const listItemEnds = createElement("li", "fs-4 object-detail-element");
  const spanListItemEnds = createElement("span", "fw-bold", "Ends at: ");
  listItemEnds.appendChild(spanListItemEnds);
  listItemEnds.append(endsDate.toLocaleString());

  container.appendChild(objectDetailsHeader);
  container.appendChild(objectDetailsWrapper);

  objectDetailsWrapper.appendChild(listItemTitle);
  objectDetailsWrapper.appendChild(listItemDividerFirst);
  objectDetailsWrapper.appendChild(listItemDescription);
  objectDetailsWrapper.appendChild(listItemDividerSecond);
  objectDetailsWrapper.appendChild(listItemSeller);
  objectDetailsWrapper.appendChild(listItemLastBid);
  objectDetailsWrapper.appendChild(listItemCreatedDate);
  objectDetailsWrapper.appendChild(listItemEnds);
};
