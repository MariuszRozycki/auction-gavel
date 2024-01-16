import { URL_register } from "../api/index.mjs";
import { registerUser } from "../userData.mjs/registerUser.mjs";
import { userRegisterData } from "../userData.mjs/userRegisterData.mjs";

const path = location.pathname;
const registerForm = document.querySelector("#register-form");

export const registerPath = () => {
  if (path === "/pages/register/") {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const userName = document.querySelector("#userName").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const avatar = document.querySelector("#avatar").value;
      const user = userRegisterData(userName, email, password, avatar);
      registerUser(URL_register, user);
    });
  }
};
