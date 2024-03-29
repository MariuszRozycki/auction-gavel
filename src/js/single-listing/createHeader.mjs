import { createElement } from "../utils/createElement.mjs";

/**
 * Constructs and appends a header section to a specified container.
 * This header includes a title "Listing details" and a button "View all listings" that links back to the user details page.
 * The "View all listings" button is visually enhanced with an arrow icon, indicating a return or back action.
 * Designed to provide a consistent header layout for pages displaying details of a listing.
 *
 * @param {HTMLElement} container The DOM element to which the header will be appended.
 *
 * @example
 * // Assuming there's a container element in your HTML with an id of 'header-container'
 * const headerContainer = document.querySelector('#header-container');
 * createHeader(headerContainer);
 */

export const createHeader = (container) => {
  /* header */
  const singleListingH1 = createElement("h1", "h1 h1-header-focus text-center text-light my-0", "Listing details");
  const row = createElement("div");
  const backToAllListingsContainer = createElement(
    "div",
    "col-10 col-sm-10 col-md-8 mx-auto my-3 focus-bg d-flex justify-content-center align-items-center rounded",
    null,
    { id: "back-to-all-listings-container" },
  );
  const goBackLinkBtn = createElement(
    "a",
    "btn support-message text-light mx-auto text-center my-0 py-3 w-100 fs-6 d-flex justify-content-center align-items-center",
    "View all listings",
    { href: "../../../pages/user-details/" },
  );
  const goBackImg = createElement("img", "go-back-arrow", null, {
    src: "../../../images/pictures/arrow-go-back.svg",
  });

  container.appendChild(singleListingH1);
  container.appendChild(row);
  row.appendChild(backToAllListingsContainer);
  backToAllListingsContainer.appendChild(goBackLinkBtn);
  goBackLinkBtn.prepend(goBackImg);
};
