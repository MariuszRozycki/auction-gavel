import { renderSingleListing } from "./renderSingleListing.mjs";

export const singleListingPath = () => {
  const path = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  if (path.includes("/pages/single-listing/") && id) {
    renderSingleListing(id);
  }
};
