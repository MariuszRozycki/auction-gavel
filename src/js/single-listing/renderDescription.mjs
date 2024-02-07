import { createElement } from "../utils/createElement.mjs";

export const renderDescription = (title, description) => {
  const listingDescriptionContainer = document.querySelector("#listing-description-container");

  const objectDetailsHeader = createElement("h2", "object-details-header", "Object details: ");
  const objectDetailsWrapper = createElement("ul", "object-details-wrapper");

  const listItemTitle = createElement("li", "object-detail-element", title);
  const spanItemTitle = createElement("span", "fw-bold", "Title: ");

  const listItemDescription = createElement("li", "object-detail-element", description);
  const spanItemDescription = createElement("span", "fw-bold", "Description: ");

  listingDescriptionContainer.appendChild(objectDetailsHeader);
  listingDescriptionContainer.appendChild(objectDetailsWrapper);
  objectDetailsWrapper.appendChild(listItemTitle);
  listItemTitle.prepend(spanItemTitle);

  objectDetailsWrapper.appendChild(listItemDescription);
  listItemDescription.prepend(spanItemDescription);
};
