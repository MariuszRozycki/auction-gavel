import { createElement } from "../utils/createElement.mjs";
import { URL_allProfiles } from "../api/index.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
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
      const userDataContainer = document.querySelector(".user-data-container");
      const avatarValue = avatar || avatarNotExists;

      /* avatar and name container */
      const avatarAndNameContainer = createElement(
        "div",
        "avatar-and-name-container d-flex flex-column justify-content-center m-0",
      );
      const avatarContainer = createElement("div", "avatar-container");
      const avatarImg = createElement("img", "avatar-img rounded-circle border border-2 border-light", null, {
        src: avatarValue,
      });
      const userName = createElement("p", "avatar-name-paragraph m-0", `Hello ${name}`);

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
      console.error("Error loading or parsing user data from localStorage:", error);
    }
  }
};
