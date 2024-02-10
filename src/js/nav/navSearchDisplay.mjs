export const navSearchDisplay = () => {
  const navSearch = document.querySelector('form[role="search"]');

  window.addEventListener("resize", () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      navSearch.classList.add("d-none");
      navSearch.classList.remove("d-flex");
    } else {
      navSearch.classList.remove("d-none");
      navSearch.classList.add("d-flex");
    }
  });
};
