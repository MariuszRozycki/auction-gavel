export const logInOnMainBtn = () => {
  const logInBtn = document.querySelector("#login-on-main-btn");
  logInBtn.addEventListener("click", () => {
    window.location.href = "../../../pages/log-in/";
  });
};
