export const singleListingById = (allListings) => {
  allListings.forEach((singleListing) => {
    singleListing.addEventListener("click", async (e) => {
      e.preventDefault();
      const listingDataId = singleListing.getAttribute("data-id");

      window.location.href = `../../../pages/single-listing/?id=${listingDataId}`;
    });
  });
};
