export const localStorageClear = () => {
  localStorage.clear();
  window.location.href = "/pages/log-out/";
};
