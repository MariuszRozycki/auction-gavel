import { URL_register } from "../api/index.mjs";
import { URL_login } from "../api/index.mjs";
import { userRegisterData } from "../userData.mjs/userRegisterData.mjs";
import { registerUser } from "../userData.mjs/registerUser.mjs";
import { userLoginData } from "./userLoginData.mjs";
import { loginUser } from "../auth/loginUser.mjs";

const path = location.pathname;
const registerForm = document.querySelector("#register-form");
const logInForm = document.querySelector("#log-in-form");

export const registerPath = async () => {
  if (path === "/pages/register/") {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const userName = document.querySelector("#userName").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const avatar = document.querySelector("#avatar").value;
      const userData = userRegisterData(userName, email, password, avatar);
      registerUser(URL_register, userData);
    });
  }
};

export const loginPath = () => {
  if (path === "/") {
    logInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const userData = userLoginData(email, password);
      const userD = loginUser(URL_login, userData);
      console.log(userD);
    });
  }
};