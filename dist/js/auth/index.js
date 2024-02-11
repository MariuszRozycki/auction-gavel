import { isUserLogged } from "./isUserLogged.mjs";
export const isUserLoggedPath = () => {
  const userData = localStorage.getItem("USER_DATA");
  const path = location.pathname;
  if (path === "/" && userData) {
    isUserLogged(userData);
  }
};
