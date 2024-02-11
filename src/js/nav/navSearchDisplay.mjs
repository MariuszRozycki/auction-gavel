export const navSearchDisplay = () => {
  const navSearch = document.querySelector('form[role="search"]');

  const toggleSearchVisibility = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 0) {
      navSearch.classList.remove("d-flex");
      navSearch.classList.add("d-none");
    } else {
      navSearch.classList.remove("d-none");
      navSearch.classList.add("d-flex");
    }
  };

  window.addEventListener("resize", toggleSearchVisibility);
  toggleSearchVisibility();
};
