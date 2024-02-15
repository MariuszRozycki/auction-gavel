import { URL_register } from "../api/index.mjs";
import { URL_login } from "../api/index.mjs";
import { userRegisterData } from "../userData.mjs/userRegisterData.mjs";
import { registerUser } from "../userData.mjs/registerUser.mjs";
import { userLoginData } from "./userLoginData.mjs";
import { loginUser } from "../auth/loginUser.mjs";

/**
 * Handles user registration and login based on the current page path.
 *
 * `registerPath` listens for the submit event on the registration form and collects user input to create a new user account.
 * It uses the `registerUser` function to send the collected data to the server for account creation.
 *
 * `loginPath` listens for the submit event on the login form and collects user credentials to log the user in.
 * It uses the `loginUser` function to authenticate the user with the server.
 *
 * Both functions check the current page path to ensure that the form event listeners are only added on the appropriate pages.
 *
 * @example
 * // To be called on page load to set up form submissions for registration and login
 * registerPath();
 * loginPath();
 */

const path = location.pathname;
const registerForm = document.querySelector("#register-form");
const logInForm = document.querySelector("#log-in-form");

export const registerPath = () => {
  if (path === "/pages/register/") {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userName = document.querySelector("#userName").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const avatar = document.querySelector("#avatar").value;
      const userData = userRegisterData(userName, email, password, avatar);
      await registerUser(URL_register, userData);
    });
  }
};

export const loginPath = () => {
  if (path === "/pages/log-in/" || path === "/pages/log-out/") {
    logInForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const userData = userLoginData(email, password);
      await loginUser(URL_login, userData);
    });
  }
};
