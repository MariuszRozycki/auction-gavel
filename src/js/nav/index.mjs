import { navNotLogged } from "./navNotLogged.mjs";

export const navDisplay = () => {
  const userData = localStorage.getItem("USER_DATA");

  if (userData) {
    console.log("User is logged");
  } else {
    navNotLogged();
  }
};
