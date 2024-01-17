import { displayError } from "../utils/displayError.mjs";

export const getAllListings = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();

    for (let listing of json) {
      console.log("listing", listing);
    }
  } catch (error) {
    displayError();
    throw error;
  }
};
