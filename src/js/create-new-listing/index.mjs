import { createNewListing } from "./createNewListing.mjs";

/**
 * Checks the current page path and calls `createNewListing` if the user is on the create new listing page.
 *
 * @example
 * // To be called on page load to ensure the listing creation logic is initialized appropriately
 * createNewListingPath();
 */

export const createNewListingPath = () => {
  const path = location.pathname;
  if (path === "/pages/create-new-listing/") createNewListing();
};
