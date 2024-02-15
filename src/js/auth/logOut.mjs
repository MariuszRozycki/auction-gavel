import { localStorageClear } from "../storage/localStorageClear.mjs";

/**
 * Attaches an event listener to the specified logout button.
 * When the button is clicked, it clears the localStorage by calling `localStorageClear`.
 * This function is typically used to log out a user from the application.
 * @param {HTMLElement} logOutButton The logout button to which the click event listener will be attached.
 * @example
 * ```js
 * // Example of using logOut to attach a logout event to a button
 * const logoutBtn = document.querySelector('#logoutBtn');
 * logOut(logoutBtn);
 * ```
 */

export const logOut = (logOutButton) => {
  logOutButton.addEventListener("click", () => {
    localStorageClear();
  });
};
