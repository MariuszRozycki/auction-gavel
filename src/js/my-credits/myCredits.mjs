import { createElement } from "../utils/createElement.mjs";
import { URL_allProfiles } from "../api/index.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { textCapitalized } from "../utils/textCapitalized.mjs";
import { displayError } from "../utils/displayError.mjs";

/**
 * Fetches and displays the current user's total credits from the server.
 * Retrieves the user's name from localStorage, constructs a URL to fetch credits,
 * and then displays the user's name and total credits in designated containers.
 * Also sets up an event listener on a button to redirect to the user details page.
 * In case of an error during fetching, displays an error message.
 *
 * Assumes the presence of specific elements in the DOM: a container for the header credits
 * (`#header-credits-container`), a container for the paragraph credits (`.paragraph-credits-container`),
 * and a button for viewing all listings (`#credits-all-listings`).
 *
 * @async
 * @example
 * // To be called when the my credits page is loaded to display the user's credits
 * myCredits();
 */

export const myCredits = async () => {
  const userData = localStorage.getItem("USER_DATA");
  const parsedUserData = JSON.parse(userData);
  const { name } = parsedUserData;
  const URL_creditsByName = `${URL_allProfiles}/${name}/credits`;
  const headerCreditsContainer = document.querySelector("#header-credits-container");
  const paragraphCreditContainer = document.querySelector(".paragraph-credits-container");
  const btnAllListings = document.querySelector("#credits-all-listings");
  headerCreditsContainer.innerHTML = "";
  paragraphCreditContainer.innerHTML = "";

  try {
    const method = "GET";
    const json = await authWithToken(method, URL_creditsByName);
    const { credits } = json.json;
    const nameCapitalized = textCapitalized(name);
    const nameContainer = createElement("span", "name-wrapper d-block", "Hi " + nameCapitalized);
    const creditHeaderContainer = createElement("span", "credit-container d-block", "your total credit is:");
    paragraphCreditContainer.innerHTML = credits + " credits!";
    headerCreditsContainer.appendChild(nameContainer);
    headerCreditsContainer.appendChild(creditHeaderContainer);
    btnAllListings.addEventListener("click", () => {
      window.location.href = "/pages/user-details/";
    });
  } catch (error) {
    console.error(error);
    displayError();
  }
};
