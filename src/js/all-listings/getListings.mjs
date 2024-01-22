import { displayError } from "../utils/displayError.mjs";

export const getListings = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  } catch (error) {
    displayError();
    throw error;
  }
};
