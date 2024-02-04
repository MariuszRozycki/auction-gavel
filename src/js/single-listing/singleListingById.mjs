export const singleListingById = (allListings) => {
  allListings.forEach((singleListing) => {
    singleListing.addEventListener("click", () => {
      console.log("singleListing inside function", singleListing);
    });
  });
};
