import { createElement } from "./createElement.mjs";
import { abbreviateAndCapitalize } from "./abbrevAndCapitalize.mjs";
export const renderCarousel = (id, media, title) => {
  const carouselWrapper = document.querySelector("#carousel-wrapper");
  const mediaNotExists = ["../../../images/pictures/no-img.png"];
  const abbrevTitle = abbreviateAndCapitalize(title);

  /* carousel */
  const carouselId = `carouselExampleIndicators${id}`;
  const carousel = createElement("div", "carousel slide", null, {
    id: carouselId,
  });
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
    const img = createElement("img", "d-block w-100 text-light", null, {
      src: imgSrc,
      alt: abbrevTitle,
    });
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
};
