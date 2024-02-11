import { URL_allListings } from "../api/index.mjs";
import { getData } from "../getData/getData.mjs";
import { renderListings } from "./renderListings.mjs";
import { showMoreLessFunction } from "../utils/showMoreLessFunction.mjs";
export const filteredListings = (
  formFilter,
  URL_limited,
  sortOrder,
  limitNr,
  offsetNr,
  showMoreBtn,
  showLessBtn,
  maxLimit,
  path,
) => {
  formFilter.addEventListener("change", async () => {
    const listingsContainer = document.querySelector("#listings-container");
    const selectedValue = formFilter.value;
    const selectedText = formFilter.options[formFilter.selectedIndex].innerText;

    sortOrder = selectedValue;

    localStorage.setItem("SORT_ORDER", JSON.stringify(sortOrder));
    URL_limited = `${URL_allListings}?sort=created&sortOrder=${sortOrder}&limit=${limitNr}&offset=${offsetNr}&_active=true`;
    const json = await getData(URL_limited);
    listingsContainer.innerHTML = "";
    renderListings(json);
    showMoreLessFunction(showMoreBtn, showLessBtn, limitNr, offsetNr, maxLimit, path, sortOrder);
  });
};
