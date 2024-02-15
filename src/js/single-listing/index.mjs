import { renderSingleListing } from "./renderSingleListing.mjs";

/**
 * Checks if the current page is the single listing page and if an ID parameter is present in the URL.
 * If both conditions are met, it calls `renderSingleListing` with the ID from the URL to display the details of the specific listing.
 * This function ensures that listing details are only rendered on the appropriate page and when a valid ID is provided.
 *
 * @example
 * // To be called on page load to check if the single listing page should display a specific listing
 * singleListingPath();
 */

export const singleListingPath = () => {
  const path = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  if (path.includes("/pages/single-listing/") && id) {
    renderSingleListing(id);
  }
};
