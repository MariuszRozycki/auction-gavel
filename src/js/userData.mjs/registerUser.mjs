import { counter } from "../utils/counter.mjs";
import { displayError } from "../utils/displayError.mjs";

/**
 * Attempts to register a new user with the provided user data by sending a POST request to the specified URL.
 * Displays success or failure messages based on the server's response.
 * On successful registration, it shows a success message and briefly activates a counter function.
 * On failure, it displays specific error messages related to the failed registration criteria, such as invalid email or missing fields.
 * Utilizes `displayError` to show a generic error message if an exception occurs during the fetch operation.
 *
 * @param {string} url The URL to which the registration request is sent.
 * @param {Object} userData An object containing the user's registration data (name, email, password, etc.).
 *
 * @example
 * // Example usage for registering a new user
 * const userData = {
 *   name: "John Doe",
 *   email: "john.doe@stud.noroff.no",
 *   password: "password123",
 *   avatar: "http://example.com/avatar.jpg"
 * };
 * registerUser('https://api.example.com/register', userData);
 */

export const registerUser = async (url, userData) => {
  const headerMain = document.querySelector("#header-main");
  const userRegisterFailure = document.querySelector("#user-not-registered");
  const userRegisterSuccess = document.querySelector("#user-registered");

  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    if (response.ok) {
      headerMain.innerText = `You have full access!`;
      userRegisterSuccess.classList.remove("d-none");
      userRegisterFailure.classList.add("d-none");
      setTimeout(() => {
        counter();
      }, 200);
    }

    if (!response.ok) {
      const nameError = document.querySelector(".name-error");
      const emailError = document.querySelector(".email-error");
      const passwordError = document.querySelector(".password-error");

      const jsonErrors = json.errors;

      for (const error of jsonErrors) {
        let errorMessage = error.message;

        if (errorMessage.includes(`Only noroff.no emails are allowed to register`)) {
          errorMessage = `Email must contain @noroff.no or @stud.noroff.no`;
        }

        switch (true) {
          case errorMessage.includes("Name"):
            nameError.innerText = `Field 'Name' can't be empty.`;
            nameError.classList.remove("d-none");
            break;
          case errorMessage.includes("email"):
            emailError.innerText = `Only user with @stud.noroff.no`;
            emailError.classList.remove("d-none");
            break;
          case errorMessage.includes("Password"):
            passwordError.innerText = `${errorMessage}.`;
            passwordError.classList.remove("d-none");
            break;
          case errorMessage.includes("Profile"):
            userRegisterFailure.innerText = errorMessage;
            userRegisterFailure.classList.remove("d-none");
            userRegisterSuccess.classList.add("d-none");
        }
      }
    }

    return json;
  } catch (error) {
    displayError(error);
    throw error;
  }
};
