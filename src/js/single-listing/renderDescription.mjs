import { createElement } from "../utils/createElement.mjs";

export const renderDescription = (title, description) => {
  const listingDescriptionContainer = document.querySelector("#listing-description-container");

  const objectDetailsHeader = createElement("h2", "object-details-header", "Object details: ");
  const objectDetailsWrapper = createElement("ul", "object-details-wrapper");

  const listItemTitle = createElement("li", "object-detail-element");
  const spanItemTitle = createElement("span", "fw-bold", "Title: ");
  listItemTitle.appendChild(spanItemTitle);
  listItemTitle.append(title);

  const listItemDivider = createElement("li", "divider");
  const hr = document.createElement("hr");
  listItemDivider.appendChild(hr);

  const listItemDescription = createElement("li", "object-detail-element");
  const spanItemDescription = createElement("span", "fw-bold", "Description: ");
  listItemDescription.appendChild(spanItemDescription);
  listItemDescription.append(description);

  listingDescriptionContainer.appendChild(objectDetailsHeader);
  listingDescriptionContainer.appendChild(objectDetailsWrapper);
  objectDetailsWrapper.appendChild(listItemTitle);
  objectDetailsWrapper.appendChild(listItemDivider);
  objectDetailsWrapper.appendChild(listItemDescription);
};
``;
