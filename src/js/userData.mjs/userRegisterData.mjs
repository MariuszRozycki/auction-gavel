/**
 * Validates user registration data (name, email, password, and optionally avatar) and returns an object containing these details.
 * Utilizes helper functions to check the validity of the name, email, and password:
 * - `isValidName` checks if the name contains only word characters.
 * - `isValidEmail` ensures the email is a valid Noroff student email address.
 * - `isValidPassword` verifies that the password is at least 8 characters long.
 * Displays error messages next to the respective input fields if the validation fails.
 * The avatar URL is included if provided; otherwise, it defaults to an empty string.
 *
 * @param {string} userName The user's name.
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @param {string} avatar The URL of the user's avatar image (optional).
 * @returns {Object} An object with the user's registration data.
 *
 * @example
 * // Example usage for creating registration data
 * const registrationData = userRegisterData("JohnDoe", "john.doe@stud.noroff.no", "password123", "http://example.com/avatar.jpg");
 * // registrationData will contain the name, email, password, and avatar if valid, or empty strings with displayed errors if not.
 */

const isValidName = (userName) => {
  const regex = /^[\w]+$/;
  return userName && regex.test(userName);
};

const isValidEmail = (email) => {
  // return email && (email.endsWith("@noroff.no") || email.endsWith("@stud.noroff.no"));
  return email && email.endsWith("@stud.noroff.no");
};

const isValidPassword = (password) => {
  return password && password.length >= 8;
};

export const userRegisterData = (userName, email, password, avatar) => {
  let user = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };

  const nameError = document.querySelector(".name-error");
  const emailError = document.querySelector(".email-error");
  const passwordError = document.querySelector(".password-error");

  if (isValidName(userName)) {
    user.name = userName;
    nameError.classList.add("d-none");
  } else {
    nameError.classList.remove("d-none");
  }

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

  user.avatar = avatar ? avatar : "";

  return user;
};
