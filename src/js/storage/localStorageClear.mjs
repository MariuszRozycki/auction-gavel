/**
 * Function cleans localStorage and moves to "/pages/log-out/"
 */

export const localStorageClear = () => {
  localStorage.clear();
  window.location.href = "/pages/log-out/";
};
