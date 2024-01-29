export const localStorageClear = () => {
  console.log("localStorageClear dziala!");
  localStorage.clear();
  window.location.href = "/pages/log-out/";
};
