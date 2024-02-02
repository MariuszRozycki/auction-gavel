import { createElement } from "../utils/createElement.mjs";

export const renderAvatarLoggedUser = () => {
  const userData = localStorage.getItem("USER_DATA");

  if (userData) {
    const parsedUserData = JSON.parse(userData);
    const { avatar, name, credits } = parsedUserData;
    console.log("parsedUserData", parsedUserData);
    const userDataContainer = document.querySelector(".user-data-container");

    /* avatar and name container */
    const avatarAndNameContainer = createElement(
      "div",
      "avatar-and-name-container d-flex flex-column justify-content-center m-0",
    );
    const avatarContainer = createElement("div", "avatar-container");
    const avatarImg = createElement("img", "avatar-img", null, { src: avatar });
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
  }
};
