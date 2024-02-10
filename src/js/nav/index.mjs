import { navNotLogged } from "./navNotLogged.mjs";
import { navLogged } from "./navLogged.mjs";
import { navSearchDisplay } from "./navSearchDisplay.mjs";

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
