export const logInOnMainBtn = () => {
  const repoName = "/auction-gavel/";
  const path = location.pathname;
  const isRootPath = path === "/" || path.startsWith(repoName);
  if (isRootPath) {
    const logInBtn = document.querySelector("#login-on-main-btn");
    logInBtn.addEventListener("click", () => {
      window.location.href = "../../../pages/log-in/";
    });
  }
};
