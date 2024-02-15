import { displayError } from "../utils/displayError.mjs";

/**
 * Attempts to log in a user using provided credentials.
 * Sends a POST request with the user data to the specified URL.
 * On successful login, stores the access token and user profile data in localStorage.
 * Redirects the user to the user details page upon successful login.
 * Displays appropriate error messages for email or password validation failures.
 * Utilizes the `displayError` function to handle any fetch-related errors.
 * @async
 * @param {string} url The URL to which the login request is sent.
 * @param {Object} userData An object containing the user's login credentials.
 * @returns {Promise<Object>} A promise that resolves with the JSON response from the server.
 * @throws Will throw an error if the fetch request fails.
 * @example
 * ```js
 * // Example of using loginUser to attempt a user login
 * const userData = {
 *   email: "user@noroff.no",
 *   password: "password123"
 * };
 * loginUser('https://api.noroff.dev/api/v1/auth/login', userData)
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 * ```
 */

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
    const json = await response.json();

    if (response.ok) {
      const accessToken = json.accessToken;
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      const userProfileData = { ...json };
      delete userProfileData.accessToken;
      localStorage.setItem("USER_DATA", JSON.stringify(userProfileData));

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
