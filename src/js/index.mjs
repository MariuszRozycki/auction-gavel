import { isUserLoggedPath } from "./auth/index.mjs";
import { registerPath } from "./userData.mjs/index.mjs";
import { loginPath } from "./userData.mjs/index.mjs";
import { allListings } from "./all-listings/index.mjs";
import { navDisplay } from "./nav/index.mjs";
import { logInOnMainBtn } from "./utils/logInOnMainBtn.mjs";
import { avatarPathFunctions } from "./avatar/index.mjs";
import { myCreditsPath } from "./my-credits/index.mjs";
import { createNewListingPath } from "./create-new-listing/index.mjs";
import { singleListingPath } from "./single-listing/index.mjs";

/**
 * Initializes various functionalities related to user authentication, navigation, and content display on a web application.
 * This script checks if a user is logged in, handles registration and login processes, displays all listings, manages the navigation bar,
 * enables a login button on the main page, manages avatar-related functionalities, handles the display of user credits,
 * manages the creation of new listings, and handles the display of single listing details.
 * Additionally, it modifies the behavior of the navbar logo based on the user's logged-in status:
 * if the user is logged in, clicking the navbar logo redirects to the user details page; otherwise, it redirects to the homepage.
 *
 * Functions:
 * - `isUserLoggedPath`: Checks and handles the user's logged-in status.
 * - `registerPath`: Sets up the registration process.
 * - `loginPath`: Sets up the login process.
 * - `allListings`: Displays all listings.
 * - `navDisplay`: Manages the display of the navigation bar.
 * - `logInOnMainBtn`: Enables a login button on the main page.
 * - `avatarPathFunctions`: Manages avatar-related functionalities.
 * - `myCreditsPath`: Handles the display of user credits.
 * - `createNewListingPath`: Manages the creation of new listings.
 * - `singleListingPath`: Handles the display of single listing details.
 * - Navbar logo click event: Modifies the navbar logo's behavior based on user authentication status.
 *
 * @example
 * // This script is typically run on page load to initialize the specified functionalities.
 */

isUserLoggedPath();
registerPath();
loginPath();
allListings();
navDisplay();
logInOnMainBtn();
avatarPathFunctions();
myCreditsPath();
createNewListingPath();
singleListingPath();

const navLogo = document.querySelector(".navbar-brand");
navLogo.addEventListener("click", (e) => {
  e.preventDefault();
  const userData = localStorage.getItem("USER_DATA");

  if (userData) {
    navLogo.setAttribute("href", "/pages/user-details/");
    window.location.href = "../../../pages/user-details/";
  }
  if (!userData) {
    window.location.href = "/";
  }
});
