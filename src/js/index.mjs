import { registerPath } from "./userData.mjs/index.mjs";
import { loginPath } from "./userData.mjs/index.mjs";
import { allListings } from "./all-listings/index.mjs";
import { navDisplay } from "./nav/index.mjs";
import { logInOnMainBtn } from "./utils/loginOnMainBtn.mjs";
import { avatarPathFunctions } from "./avatar/index.mjs";
import { myCreditsPath } from "./my-credits/index.mjs";
import { createNewListingPath } from "./create-new-listing/index.mjs";

registerPath();
loginPath();
allListings();
navDisplay();
logInOnMainBtn();
avatarPathFunctions();
myCreditsPath();
createNewListingPath();
