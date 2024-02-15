import { URL_base } from "../api/index.mjs";
import { mediaProfileData } from "./mediaProfileData.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { displayError } from "../utils/displayError.mjs";

export const updateAvatar = async () => {
  try {
    const loggedUserData = localStorage.getItem("USER_DATA");
    const parsedUserData = JSON.parse(loggedUserData);
    const { name: userName, avatar: currentAvatar } = parsedUserData;

    const updateAvatarForm = document.querySelector("#update-avatar-form");
    const avatarInput = document.querySelector("#update-avatar-input");
    const updateAvatarError = document.querySelector(".update-avatar-error");

    avatarInput.value = currentAvatar;

    const URL_updateAvatar = `${URL_base}/auction/profiles/${userName}/media`;

    updateAvatarForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const newAvatarInputValue = avatarInput.value;
        parsedUserData.avatar = newAvatarInputValue;
        localStorage.setItem("USER_DATA", JSON.stringify(parsedUserData));

        const mediaData = mediaProfileData(newAvatarInputValue);

        const method = "PUT";
        const json = await authWithToken(method, URL_updateAvatar, mediaData);
        console.log(json);

        const responseError = !json.response.ok;
        if (responseError) {
          for (const error of json.json.errors) {
            updateAvatarError.classList.remove("d-none");
            updateAvatarError.innerText = error.message;
          }
        } else if (newAvatarInputValue === "" || newAvatarInputValue === null) {
          updateAvatarError.classList.remove("d-none");
          updateAvatarError.innerText = "Avatar input is empty";
        } else {
          window.location.href = "../../../pages/avatar-is-updated/";
        }
      } catch (error) {
        console.error("Error during avatar update:", error);
        displayError();
      }
    });
  } catch (error) {
    console.error("Error initializing avatar update:", error);
    displayError();
  }
};
