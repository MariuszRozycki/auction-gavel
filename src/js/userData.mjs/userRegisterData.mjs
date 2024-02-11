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
