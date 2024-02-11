export const isUserLogged = () => {
  const userData = localStorage.getItem("USER_DATA");

  if (userData) window.location.href = "../../../pages/user-details/";
};
