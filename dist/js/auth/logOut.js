import { localStorageClear } from "../storage/localStorageClear.mjs";
export const logOut = (logOutButton) => {
  logOutButton.addEventListener("click", () => {
    localStorageClear();
  });
};
