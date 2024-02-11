import { createElement } from "../utils/createElement.mjs";
import { URL_allProfiles } from "../api/index.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { textCapitalized } from "../utils/textCapitalized.mjs";

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
    const nameCapitalized = textCapitalize(name);
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
  }
};
