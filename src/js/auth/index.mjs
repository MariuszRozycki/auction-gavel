import { isUserLogged } from "./isUserLogged.mjs";

export const isUserLoggedPath = () => {
  const path = location.pathname;

  if (path === "/") {
    isUserLogged();
  }
};
