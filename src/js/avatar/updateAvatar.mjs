import { URL_base } from "../api/index.mjs";
import { mediaProfileData } from "./mediaProfileData.mjs";
import { authWithToken } from "../auth/authWithToken.mjs";
import { displayError } from "../utils/displayError.mjs";

/**
 * Handles the avatar update process for the logged-in user.
 * Initializes the avatar update form with the current user's avatar URL from localStorage.
 * On form submission, updates the user's avatar URL in localStorage and sends a PUT request
 * to update the avatar in the backend via `authWithToken`.
 * Displays any errors returned by the backend on the form.
 * Redirects to the avatar updated confirmation page upon successful update.
 * Utilizes `displayError` to show error messages if any exceptions occur during the process.
 *
 * @async
 * @example
 * // To be called on the avatar update page to initialize the form and handle updates
 * updateAvatar();
 */

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
