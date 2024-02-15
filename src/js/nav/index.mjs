import { navNotLogged } from "./navNotLogged.mjs";
import { navLogged } from "./navLogged.mjs";
import { navSearchDisplay } from "./navSearchDisplay.mjs";

/**
 * Dynamically updates the navigation bar based on the user's logged-in status.
 * Checks if user data is present in localStorage to determine the logged-in status.
 * Calls `navLogged` to display the navigation bar for logged-in users or `navNotLogged` for guests.
 * Independently calls `navSearchDisplay` to handle the search functionality in the navigation bar.
 * Assumes the presence of a `#nav-container` element in the DOM to host the navigation bar.
 *
 * @example
 * // To be called on page load or when the navigation bar needs to be updated
 * navDisplay();
 */

export const navDisplay = () => {
  const userData = localStorage.getItem("USER_DATA");
  const navContainer = document.querySelector("#nav-container");

  if (userData) {
    navLogged(navContainer);
  } else {
    navNotLogged(navContainer);
  }

  navSearchDisplay();
};
