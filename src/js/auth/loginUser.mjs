import { displayError } from "../utils/displayError.mjs";

export async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, postData);
    console.log("response", response);
    const json = await response.json();
    console.log("json", json);

    if (response.ok) {
      const accessToken = json.accessToken;
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      const userProfileData = { ...json };
      delete userProfileData.accessToken;
      localStorage.setItem("USER_DATA", JSON.stringify(userProfileData));

      console.log("accessToken", accessToken);
      console.log("userProfileData", userProfileData);

      window.location.href = "../../../pages/user-details/";
    } else {
      const password = document.querySelector("#password").value;
      const emailError = document.querySelector(".email-error");
      const passwordError = document.querySelector(".password-error");
      const jsonErrors = json.errors;

      for (let error of jsonErrors) {
        let errorMessage = error.message;

        if (errorMessage.includes(`Email must be a valid email`)) {
          errorMessage = `Email must contain @noroff.no or @stud.noroff.no`;
        }

        if (error.message.includes("email")) {
          emailError.innerText = errorMessage;
          emailError.classList.remove("d-none");
        }

        if (password.length < 8) {
          passwordError.innerText = `Password must be min 8 characters long.`;
          passwordError.classList.remove("d-none");
        }
      }
    }

    return json;
  } catch (error) {
    displayError();
    throw error;
  }
}
