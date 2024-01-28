export const navSearchDisplay = (navContainer) => {
  const navSearch = navContainer.nextElementSibling.matches('form[role="search"]')
    ? navContainer.nextElementSibling
    : null;

  window.addEventListener("resize", () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      navSearch.classList.add("d-none");
    } else {
      navSearch.classList.remove("d-none");
    }
  });
};
