import { createNewListing } from "./createNewListing.mjs";
export const createNewListingPath = () => {
  const path = location.pathname;
  if (path === "/pages/create-new-listing/") createNewListing();
};
