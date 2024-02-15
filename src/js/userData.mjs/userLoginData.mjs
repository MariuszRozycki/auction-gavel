/**
 * Validates user login credentials (email and password) and returns an object containing these credentials.
 * Utilizes helper functions to check the validity of the email and password:
 * - `isValidEmail` ensures the email belongs to the Noroff domain.
 * - `isValidPassword` checks that the password is at least 8 characters long.
 * Displays error messages next to the respective input fields if the validation fails.
 *
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns {Object} An object with the user's email and password if valid, empty strings otherwise.
 *
 * @example
 * // Example usage for creating login data
 * const loginData = userLoginData("john.doe@stud.noroff.no", "password123");
 * // loginData will contain the email and password if valid, or empty strings with displayed errors if not.
 */

const isValidEmail = (email) => {
  return email && (email.endsWith("@noroff.no") || email.endsWith("@stud.noroff.no"));
};

const isValidPassword = (password) => {
  return password && password.length >= 8;
};

export const userLoginData = (email, password) => {
  let user = {
    email: "",
    password: "",
  };

  const emailError = document.querySelector(".email-error");
  const passwordError = document.querySelector(".password-error");

  if (isValidEmail(email)) {
    user.email = email;
    emailError.classList.add("d-none");
  } else {
    emailError.classList.remove("d-none");
  }

  if (isValidPassword(password)) {
    user.password = password;
    passwordError.classList.add("d-none");
  } else {
    passwordError.classList.remove("d-none");
  }

  return user;
};
