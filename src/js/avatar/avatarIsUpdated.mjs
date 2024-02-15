import { createElement } from "../utils/createElement.mjs";
import { displayError } from "../utils/displayError.mjs";

/**
 * Updates user's avatar from localStorage and sets event for avatar update.
 *
 * @example
 * avatarIsUpdated();
 */

export const avatarIsUpdated = () => {
  try {
    const localStorageData = localStorage.getItem("USER_DATA");
    if (!localStorageData) throw new Error("No USER_DATA found in localStorage.");

    const parsedLocal = JSON.parse(localStorageData);
    const { avatar: newAvatar } = parsedLocal;

    const newAvatarContainer = document.querySelector(".new-avatar-container");
    if (!newAvatarContainer) throw new Error(".new-avatar-container not found in the DOM.");

    const newAvatarImg = createElement("img", "new-avatar-img", null, { src: newAvatar });
    newAvatarContainer.appendChild(newAvatarImg);
  } catch (error) {
    displayError();
  }

  // Update avatar again button
  document.querySelector("#update-again").addEventListener("click", () => {
    window.location.href = "../../../pages/update-avatar/";
  });
};
