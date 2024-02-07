import { URL_base } from "../api/index.mjs";
import { getListings } from "../all-listings/getListings.mjs";
import { createElement } from "../utils/createElement.mjs";
import { abbreviateAndCapitalize } from "../utils/abbrevAndCapitalize.mjs";

export const renderSingleListing = async (id) => {
  const singleListingContainer = document.querySelector("#single-listing-container");
  const carouselWrapper = document.querySelector("#carousel-wrapper");
  singleListingContainer.innerHTML = "";
  const mediaNotExists = ["../../../images/pictures/no-img.png"];
  const titleNotExists = "Title not exists";

  const URL_singleListing = `${URL_base}/auction/listings/${id}?_seller=true&_bids=true`;

  try {
    const singleListingData = await getListings(URL_singleListing);
    console.log("singleListingData: ", singleListingData);
    const {
      bids,
      created,
      description,
      endsAt,
      media,
      seller: { name },
      title,
      tags,
      updated,
    } = singleListingData;

    const abbrevTitle = abbreviateAndCapitalize(title);

    const titleValue = title || titleNotExists;

    /* header */
    const singleListingH1 = createElement("h1", "h1 h1-header-focus text-center text-light my-0", "Listing title: ");
    const dataTitle = createElement("span", null, titleValue);
    const row = createElement("div");
    const backToAllListingsContainer = createElement(
      "div",
      "col-10 col-sm-10 col-md-8 mx-auto my-3 focus-bg d-flex justify-content-center align-items-center rounded",
      null,
      { id: "back-to-all-listings-container" },
    );
    const goBackLinkBtn = createElement(
      "a",
      "btn support-message text-light mx-auto text-center my-0 py-3 w-100 fs-6 d-flex justify-content-center align-items-center",
      "View all listings",
      { href: "../../../pages/user-details/" },
    );
    const goBackImg = createElement("img", "go-back-arrow", null, {
      src: "../../../images/pictures/arrow-go-back.svg",
    });

    singleListingContainer.appendChild(singleListingH1);
    singleListingH1.appendChild(dataTitle);
    singleListingContainer.appendChild(row);
    row.appendChild(backToAllListingsContainer);
    backToAllListingsContainer.appendChild(goBackLinkBtn);
    goBackLinkBtn.prepend(goBackImg);

    /* carousel */
    const carouselId = `carouselExampleIndicators${id}`;
    const carousel = createElement("div", "carousel slide", null, { id: carouselId });
    const carouselIndicators = createElement("div", "carousel-indicators");
    const carouselInner = createElement("div", "carousel-inner");
    const mediaValue = media && media.length > 0 ? media : mediaNotExists;
    mediaValue.forEach((imgSrc, index) => {
      const button = createElement("button", `${index === 0 ? "active" : ""}`, null, {
        type: "button",
        "data-bs-target": `#${carouselId}`,
        "data-bs-slide-to": `${index}`,
        "aria-label": `Slide ${index + 1}`,
      });
      if (index === 0) button.setAttribute("aria-current", "true");
      carouselIndicators.appendChild(button);

      const carouselItem = createElement("div", index === 0 ? "carousel-item active" : "carousel-item");
      const img = createElement("img", "d-block w-100", null, { src: imgSrc, alt: abbrevTitle });
      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
    });

    carouselWrapper.appendChild(carousel);
    carousel.appendChild(carouselIndicators);
    carousel.appendChild(carouselInner);

    if (mediaValue.length <= 1) carouselIndicators.classList.add("d-none");

    const prevButton = createElement("button", "carousel-control-prev", null, {
      type: "button",
      "data-bs-target": `#${carouselId}`,
      "data-bs-slide": "prev",
    });
    prevButton.innerHTML =
      '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

    const nextButton = createElement("button", "carousel-control-next", null, {
      type: "button",
      "data-bs-target": `#${carouselId}`,
      "data-bs-slide": "next",
    });
    nextButton.innerHTML =
      '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    if (mediaValue.length <= 1) {
      prevButton.classList.add("d-none");
      nextButton.classList.add("d-none");
    }
  } catch (error) {
    console.error(error);
  }
};
