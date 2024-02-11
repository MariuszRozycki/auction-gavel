import { displayError } from "../utils/displayError.mjs";

export const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();

    return json;
  } catch (error) {
    displayError();
    throw error;
  }
};
