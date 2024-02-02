import { registerPath } from "./userData.mjs/index.mjs";
import { loginPath } from "./userData.mjs/index.mjs";
import { allListings } from "./all-listings/index.mjs";
import { navDisplay } from "./nav/index.mjs";
import { logInOnMainBtn } from "./utils/loginOnMainBtn.mjs";
import { avatarPathFunctions } from "./avatar/index.mjs";

registerPath();
loginPath();
allListings();
navDisplay();
logInOnMainBtn();
avatarPathFunctions();
