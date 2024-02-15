import { isUserLoggedPath } from "./auth/index.mjs";
import { registerPath } from "./userData.mjs/index.mjs";
import { loginPath } from "./userData.mjs/index.mjs";
import { allListings } from "./all-listings/index.mjs";
import { navDisplay } from "./nav/index.mjs";
import { logInOnMainBtn } from "./utils/loginOnMainBtn.mjs";
import { avatarPathFunctions } from "./avatar/index.mjs";
import { myCreditsPath } from "./my-credits/index.mjs";
import { createNewListingPath } from "./create-new-listing/index.mjs";
import { singleListingPath } from "./single-listing/index.mjs";

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
