/**
 * Redirects the user to the user details page if user data is present.
 * This function is used to ensure that logged-in users are redirected to their details page.
 * @param {string} userData The user data retrieved from localStorage, used to verify if the user is logged in.
 * @example
 * ```js
 * // Example of redirecting a logged-in user to their details page
 * const userData = localStorage.getItem("USER_DATA");
 * isUserLogged(userData);
 * ```
 */

export const isUserLogged = (userData) => {
  if (userData) {
    window.location.href = "../../../pages/user-details/";
  }
};
