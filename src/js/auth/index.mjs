import { isUserLogged } from "./isUserLogged.mjs";

/**
 * Checks if the user is on the root path and has user data stored in localStorage.
 * If both conditions are met, it calls the `isUserLogged` function with the user data.
 * This function is typically used to verify if a logged-in user is accessing the home page.
 * @example
 * ```js
 * // To check if a logged-in user is on the home page and take appropriate action
 * isUserLoggedPath();
 * ```
 */

export const isUserLoggedPath = () => {
  const userData = localStorage.getItem("USER_DATA");
  const path = location.pathname;

  if (path === "/" && userData) {
    isUserLogged(userData);
  }

  if (
    (path === "/pages/contact/" && userData) ||
    (path === "/pages/about/" && userData) ||
    (path === "/pages/single-listing/" && userData) ||
    (path === "/pages/avatar-is-updated/" && userData) ||
    (path === "/pages/create-new-listing/" && userData) ||
    (path === "/pages/my-credits/" && userData) ||
    (path === "/pages/update-avatar/" && userData) ||
    (path === "/pages/user-details/" && userData)
  ) {
    const userDataAvatarContainer = document.querySelector(".user-data");
    userDataAvatarContainer.classList.remove("d-none");
  }
};
