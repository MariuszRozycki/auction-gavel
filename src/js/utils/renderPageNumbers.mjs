import { createElement } from "./createElement.mjs";

export const renderPageNumbers = async (pageNr) => {
  console.log("pageNr inside renderPageNumbers", pageNr);
  const pageNumberContainer = document.querySelector("#wrapper-page-number-btn");
  pageNumberContainer.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    pageNr = i.toString();
    const buttonPageNumber = createElement("button", "page-number-btn btn btn-primary me-2", pageNr);
    pageNumberContainer.appendChild(buttonPageNumber);
  }

  const allButtonsPageNumber = document.querySelectorAll(".page-number-btn");

  allButtonsPageNumber.forEach((singleBtn) => {
    singleBtn.addEventListener("click", () => {
      const buttonNr = singleBtn.innerHTML;
      console.log(buttonNr);
      return buttonNr;
    });
  });
};
