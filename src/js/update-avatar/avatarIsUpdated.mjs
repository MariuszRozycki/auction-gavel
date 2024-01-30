import { createElement } from "../utils/createElement.mjs";

export const avatarIsUpdated = () => {
  const localStorageData = localStorage.getItem("USER_DATA");
  const parsedLocal = JSON.parse(localStorageData);
  const { avatar: newAvatar } = parsedLocal;
  console.log(newAvatar);

  const newAvatarContainer = document.querySelector(".new-avatar-container");
  const newAvatarImg = createElement("img", "new-avatar-img", null, { src: newAvatar });

  newAvatarContainer.appendChild(newAvatarImg);
};
