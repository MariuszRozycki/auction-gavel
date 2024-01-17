import { registerPath } from "./userData.mjs/index.mjs";
import { loginPath } from "./userData.mjs/index.mjs";
import { getAllListings } from "./all-listings/noAuthAccess.mjs";

/* URL-s */
import { URL_allListings } from "./api/index.mjs";

registerPath();
loginPath();
getAllListings(URL_allListings);
