/**
 * Attaches click event listeners to each listing element, redirecting the user to the single listing page with the listing's ID in the URL.
 * This function enables navigation to detailed views of listings by appending the listing's ID as a query parameter in the URL.
 * It's designed to work with multiple listing elements, each expected to have a `data-id` attribute containing the listing's unique identifier.
 *
 * @param {NodeList} allListings A collection of listing elements to which click event listeners will be added.
 *
 * @example
 * // Assuming allListings is a NodeList of elements, each with a `data-id` attribute
 * const listingElements = document.querySelectorAll('.listing');
 * singleListingById(listingElements);
 */

export const singleListingById = (allListings) => {
  allListings.forEach((singleListing) => {
    singleListing.addEventListener("click", async (e) => {
      e.preventDefault();
      const listingDataId = singleListing.getAttribute("data-id");

      window.location.href = `../../../pages/single-listing/?id=${listingDataId}`;
    });
  });
};
