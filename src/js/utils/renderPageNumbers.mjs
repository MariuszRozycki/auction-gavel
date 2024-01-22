import { createElement } from "./createElement.mjs";

export const renderPageNumbers = (currentPage, onPageChange, container) => {
  console.log("currentPage", currentPage);
  const pageNumberContainer = document.querySelector("#wrapper-page-number-btn");
  pageNumberContainer.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    const buttonClasses = `page-number-btn btn btn-primary fw-medium px-3 me-2 mb-2 ${
      currentPage === i ? "active" : ""
    }`;
    const buttonPageNumber = createElement("button", buttonClasses, i.toString());

    buttonPageNumber.addEventListener("click", () => {
      container.innerHTML = ``;
      onPageChange(i);

      document.querySelectorAll(".page-number-btn.active").forEach((activeButton) => {
        activeButton.classList.remove("active");
      });

      buttonPageNumber.classList.add("active");
    });

    pageNumberContainer.appendChild(buttonPageNumber);
  }
};
