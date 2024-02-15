/**
 * Adds an event listener to a login button on the main or root page, redirecting users to the login page when clicked.
 * This function checks if the current page is the root directory or starts with a specific repository name.
 * If the condition is met, it finds the login button by its ID and sets up a click event listener that redirects the user to the login page.
 *
 * @example
 * // To be called when the page loads to enable the login button functionality on the main page
 * logInOnMainBtn();
 */

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
