import { createElement } from "../utils/createElement.mjs";
import { URL_allProfiles } from "../api/index.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { textCapitalized } from "../utils/textCapitalized.mjs";
import { displayError } from "../utils/displayError.mjs";

/**
 * Renders the logged user's avatar, name, and credits in the user data container.
 * Fetches the user's profile data using the `authWithToken` function with a GET request.
 * If the avatar URL is not provided, a default avatar image is used.
 * The user's name is capitalized and displayed along with the avatar.
 * Credits are also displayed in a dedicated container with an icon.
 * Assumes the presence of a `.user-data-container` in the DOM.
 * Displays an error message using `displayError` if fetching data fails.
 *
 * @async
 * @example
 * // To be called when the user data section of the page needs to be populated
 * renderAvatarLoggedUser();
 */

export const renderAvatarLoggedUser = async () => {
  const userData = localStorage.getItem("USER_DATA");
  const avatarNotExists = "../../../images/pictures/green-monster-user.png";
  const method = "GET";
  if (userData) {
    try {
      const parsedUserData = JSON.parse(userData);
      const { name: loggedUserName } = parsedUserData;
      const URL_singleProfile = `${URL_allProfiles}/${loggedUserName}?_listings=true`;

      const json = await authWithToken(method, URL_singleProfile);
      const { name, credits, avatar } = json.json;

      const nameCapitalize = textCapitalized(name);

      const userDataContainer = document.querySelector(".user-data-container");
      const avatarValue = avatar || avatarNotExists;

      /* avatar and name container */
      const avatarAndNameContainer = createElement(
        "div",
        "avatar-and-name-container d-flex flex-column justify-content-center m-0",
      );
      const avatarContainer = createElement("div", "avatar-container");
      const avatarImg = createElement("img", "avatar-img rounded-circle border border-dark border-2", null, {
        src: avatarValue,
      });
      const userName = createElement("p", "avatar-name-paragraph m-0", `Hello ${nameCapitalize}`);

      /* credit container */
      const creditContainer = createElement("div", "credit-container d-flex justify-content-end align-items-end");
      const creditParagraph = createElement("p", "credit-paragraph me-2", `Credits: ${credits}`);
      const iconCreditContainer = createElement("div", "icon-credit-container d-flex align-items-center");
      const imgIconCredit = createElement("img", "icon-credit", null, {
        src: "../../../images/pictures/coin-star-ico-transparent.png",
      });

      userDataContainer.appendChild(avatarAndNameContainer);
      avatarAndNameContainer.appendChild(avatarContainer);
      avatarContainer.appendChild(avatarImg);
      avatarAndNameContainer.appendChild(userName);

      userDataContainer.appendChild(creditContainer);
      creditContainer.appendChild(creditParagraph);
      creditContainer.appendChild(iconCreditContainer);
      iconCreditContainer.appendChild(imgIconCredit);
    } catch (error) {
      console.error(error);
      displayError();
    }
  }
};
