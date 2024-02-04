import { createElement } from "../utils/createElement.mjs";

export const myCredits = () => {
  const headerCreditsContainer = document.querySelector("#header-credits-container");
  const paragraphCreditContainer = document.querySelector(".paragraph-credits-container");
  headerCreditsContainer.innerHTML = "";
  paragraphCreditContainer.innerHTML = "";

  const userData = localStorage.getItem("USER_DATA");
  const parsedUserData = JSON.parse(userData);
  const { name, credits } = parsedUserData;
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  const nameContainer = createElement("span", "name-wrapper d-block", "Hi " + nameCapitalized);
  const creditHeaderContainer = createElement("span", "credit-container d-block", "your total credit is:");

  paragraphCreditContainer.innerHTML = credits + " credits!";

  headerCreditsContainer.appendChild(nameContainer);
  headerCreditsContainer.appendChild(creditHeaderContainer);
};
