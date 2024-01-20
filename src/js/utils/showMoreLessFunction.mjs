// export const showMoreLessFunction = (offsetNr, limitNr, maxLimit, fetchListings) => {
//   const showMoreBtn = document.querySelector("#show-more-btn");
//   const showLessBtn = document.querySelector("#show-less-btn");

//   const updateButtonVisibility = () => {
//     showMoreBtn.style.display = offsetNr + limitNr <= maxLimit ? "block" : "none";
//     showLessBtn.style.display = offsetNr > 0 ? "block" : "none";
//   };

//   const showMoreHandler = async () => {
//     if (offsetNr + limitNr <= maxLimit) {
//       offsetNr += limitNr;
//       const fetchLis = await fetchListings();
//       console.log("fetchLis", fetchLis);
//       updateButtonVisibility();
//     }
//   };

//   const showLessHandler = async () => {
//     if (offsetNr - limitNr >= 0) {
//       offsetNr -= limitNr;
//       await fetchListings();
//       updateButtonVisibility();
//     }
//   };

//   showMoreBtn.addEventListener("click", showMoreHandler);
//   showLessBtn.addEventListener("click", showLessHandler);
// };

import { URL_allListings } from "../api/index.mjs";
import { getListings } from "../all-listings/getListings.mjs";
import { renderListings } from "../all-listings/renderListings.mjs";

export const showMoreFunction = (showMoreBtn, limitNr, offsetNr, maxLimit, URL_limited_to_10, path) => {
  const showMoreHandler = async () => {
    offsetNr += limitNr;

    URL_limited_to_10 = `${URL_allListings}?limit=${limitNr}&offset=${offsetNr}`;
    const updatedJsonWithOffset = await getListings(URL_limited_to_10);

    // showMoreBtn.classList.remove("d-block");
    // showMoreBtn.classList.add("d-none");
    renderListings(updatedJsonWithOffset, path, offsetNr + 1);
  };

  showMoreBtn.addEventListener("click", showMoreHandler);
};
